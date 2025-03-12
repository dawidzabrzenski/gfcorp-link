import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const app = express();
// brane z .env lub przydzielane 5000 jesli w env nie ma
const port = process.env.PORT || 5000;
const client = process.env.CLIENT_URL;

app.use(express.json());

app.use(
  cors({
    // origin: [
    //   "http://localhost:5173",
    //   "http://localhost:8044",
    //   "http://localhost:80",
    //   "http://localhost",
    //   "http://10.42.50.41:",
    //   client,
    // ], // front url
    origin: "*",
    credentials: true,
  }),
);

// połączenie z mongo
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to the MongoDB"))
  .catch((err) => console.log("Error connecting to the MongoDB: ", err));

// model użytkownika
const PermissionSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
});

const GroupSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  visibleName: { type: String, required: true, unique: true },
  permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Permission" }],
});

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  group: { type: mongoose.Schema.Types.ObjectId, ref: "Group" },
});

const LogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  action: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Permission = mongoose.model("Permission", PermissionSchema);
const Group = mongoose.model("Group", GroupSchema);
const User = mongoose.model("User", UserSchema);
const Log = mongoose.model("Log", LogSchema);

// middleware do weryfikacji tokenu JWT
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Authorization token is required" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

app.get("/api/permissions", authMiddleware, async (req, res) => {
  try {
    const permissions = await Permission.find();
    res.json(permissions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/api/userPermissions", authMiddleware, async (req, res) => {
  try {
    const groupId = req.user.role;
    const group = await Group.findById(groupId).populate("permissions");
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }
    const userPermissions = group.permissions.map((perm) => perm.name);
    res.json({ userPermissions });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/api/groups", authMiddleware, async (req, res) => {
  try {
    const groups = await Group.find()
      .populate({
        path: "permissions", // Populate the permissions field with permission documents
        select: "name", // Only return the name field from the permission documents
      })
      .exec();

    res.json(groups);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Something went wrong while fetching groups" });
  }
});

app.post("/api/groups/add", authMiddleware, async (req, res) => {
  try {
    const { name, visibleName, permissions } = req.body;

    const existingGroup = await Group.findOne({ name });
    if (existingGroup) {
      return res
        .status(400)
        .json({ message: "Grupa o podanej nazwie już istnieje" });
    }

    const permissionDocs = await Permission.find({
      name: { $in: permissions },
    });
    const permissionIds = permissionDocs.map((perm) => perm._id);

    const newGroup = new Group({
      name,
      visibleName,
      permissions: permissionIds,
    });

    await newGroup.save();
    res.status(201).json({ message: "Grupa została dodana", group: newGroup });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Błąd serwera", error: error.message });
  }
});

app.put("/api/groups/edit", authMiddleware, async (req, res) => {
  try {
    const { id, name, visibleName, permissions } = req.body;

    const group = await Group.findById(id);
    if (!group) {
      return res.status(404).json({ message: "Grupa nie została znaleziona" });
    }

    if (name && name !== group.name) {
      const existingGroup = await Group.findOne({ name });
      if (existingGroup) {
        return res
          .status(400)
          .json({ message: "Grupa o podanej nazwie już istnieje" });
      }
    }

    const permissionDocs = await Permission.find({
      name: { $in: permissions },
    });
    const permissionIds = permissionDocs.map((perm) => perm._id);

    group.name = name || group.name;
    group.visibleName = visibleName || group.visibleName;
    group.permissions = permissionIds;

    await group.save();
    res.status(200).json({ message: "Grupa została zaktualizowana", group });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Błąd serwera", error: error.message });
  }
});

app.delete("/api/groups/delete/:id", authMiddleware, async (req, res) => {
  try {
    const groupId = req.params.id;

    const deletedGroup = await Group.findByIdAndDelete(groupId);

    if (!deletedGroup) {
      return res.status(404).json({ message: "Group not found" });
    }

    res
      .status(200)
      .json({ message: "Group deleted successfully", group: deletedGroup });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// funkcja do dodawania danych do bazy
const addSampleData = async () => {
  try {
    // delete old
    await Permission.deleteMany({});
    await Group.deleteMany({});
    await User.deleteMany({});

    // perm
    const permRead = await new Permission({ name: "read" }).save();
    const permWrite = await new Permission({ name: "write" }).save();
    const permDelete = await new Permission({ name: "delete" }).save();

    // group
    const adminGroup = await new Group({
      name: "admin",
      permissions: [permRead._id, permWrite._id, permDelete._id],
    }).save();

    // hash pass
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("test123", salt);

    // example user
    const user = await new User({
      email: "test@gfcorp.pl",
      password: hashedPassword,
      group: adminGroup._id, // Referencja do grupy
    }).save();

    // create logs
    await new Log({
      user: user._id,
      action: "User created",
    }).save();

    await new Log({
      user: user._id,
      action: "User logged in",
    }).save();

    console.log("✅ Data added into the database!");
  } catch (error) {
    console.error("❌ Error while inserting the data:", error);
  }
};

// endpoint do logowania
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).populate("group");
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Nieprawidłowe dane logowania" });
    }

    console.log(user._id);

    const token = jwt.sign(
      { id: user._id, role: user.group._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// endpoint do sprawdzenia wygenerowanego tokenu
app.get("/api/protected", (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token not found" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Token is expired" });
    return res.json({ message: "Access granted" });
  });
});

app.get("/api/user", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Authorization token is required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
});

app.delete("/api/user/:id", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Authorization token is required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
});

app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find().populate("group", "name");

    if (!users.length) {
      return res.status(404).json({ message: "No users found" });
    }

    res.json(
      users.map((user) => ({
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        group: user.group ? user.group.name : null,
      })),
    );
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Something went wrong while querying users" });
  }
});

app.post("/api/user/add", authMiddleware, async (req, res) => {
  const { email, password, firstName, lastName, group } = req.body;

  try {
    const groupExist = await Group.findById(group);
    if (!groupExist) {
      return res.status(404).json({ message: "Grupa nie została znaleziona" });
    }

    const emailExist = await User.findOne({ email });
    if (emailExist) {
      return res
        .status(400)
        .json({ message: "Podany email już istnieje w bazie" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      email,
      firstName,
      lastName,
      password: hashedPassword,
      group,
    });

    await user.save();

    return res.status(201).json({ message: "Użytkownik poprawnie dodany" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
});

app.put("/api/user/edit", authMiddleware, async (req, res) => {
  try {
    const { id, email, firstName, lastName, password, group } = req.body;

    const user = await User.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({ message: "Użytkownik nie został znaleziony" });
    }

    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res
          .status(400)
          .json({ message: "Użytkownik z podanym emailem już istnieje" });
      }
    }

    if (group) {
      const groupExist = await Group.findById(group);
      if (!groupExist) {
        return res
          .status(404)
          .json({ message: "Grupa nie została znaleziona" });
      }
    }

    user.email = email || user.email;
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    if (group) {
      user.group = group;
    }

    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();

    res.status(200).json({ message: "Użytkownik został zaktualizowany", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

app.delete("/api/user/delete/:id", authMiddleware, async (req, res) => {
  try {
    const userId = req.params.id;

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res
        .status(404)
        .json({ message: "Użytkownik nie został znaleziony" });
    }

    res.status(200).json({
      message: "Użytkownik został usunięty",
      user: deletedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Błąd serwera", error: error.message });
  }
});

app.get("/", (req, res) => {
  return res.send("Hello world from GFCorp App");
});

// nasłuchiwanie servera
app.listen(port, () => {
  console.log(`Server running on ${port}`);
});

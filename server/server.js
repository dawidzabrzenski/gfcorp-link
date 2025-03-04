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

app.use(express.json());

// middleware cors - które domeny mają mieć dostep do API
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:80",
      "http://localhost",
    ], // front url
    // origin: "*",
    credentials: true, // pozwól na przesyłanie danych headerami
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
    const groupId = req.user.role;
    const group = await Group.findById(groupId).populate("permissions");
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }
    const permissions = group.permissions.map((perm) => perm.name);
    res.json({ permissions });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
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

async function addUser(email, firstName, lastName, password, groupId) {
  try {
    const group = await Group.findById(groupId);
    if (!group) {
      console.log("Group not found");
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      email,
      firstName,
      lastName,
      password: hashedPassword,
      group: groupId,
    });

    await user.save();

    console.log("User added and group assigned");
  } catch (error) {
    console.error(error);
  }
}

// addUser(
//   "test@gfcorp.pl",
//   "Testowy",
//   "User",
//   "test123",
//   "67bc2e85846aed71848dda51",
// );

// addUser(
//   "marek.orlowski@gfcorp.pl",
//   "Marek",
//   "Orlowski",
//   "gfcorp123",
//   "67bc2e85846aed71848dda51",
// );

// dodawanie usera
// addSampleData().catch((err) => console.log(err));

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

app.post("/api/add-sample-data", async (req, res) => {
  try {
    await addSampleData();
    res.status(200).json({ message: "Sample data added successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding sample data" });
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

app.get("/", (req, res) => {
  return res.send("Hello world");
});

// nasłuchiwanie servera
app.listen(port, () => {
  console.log(`Server running on ${port}`);
});

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // Frontend URL
    credentials: true, // Pozwól na przesyłanie nagłówków z danymi
  }),
);

// Połączenie z MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Połączono z MongoDB"))
  .catch((err) => console.log("Błąd połączenia z MongoDB: ", err));

// Tworzymy model użytkownika
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", UserSchema);

// Dodajemy przykładowego użytkownika w bazie danych (do testów)
const addSampleUser = async () => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash("test123", salt);

  const user = new User({
    email: "test@gfcorp.pl",
    password: hashedPassword,
  });

  await user.save();
};

// Uruchamiamy dodanie użytkownika tylko raz, jeżeli nie istnieje
addSampleUser().catch((err) => console.log("Błąd dodawania użytkownika:", err));

// Endpoint do logowania
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  // Szukamy użytkownika
  const user = await User.findOne({ email });
  if (!user)
    return res.status(400).json({ message: "Użytkownik nie znaleziony" });

  // Sprawdzamy hasło
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Nieprawidłowe hasło" });

  // Tworzymy token JWT
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  return res.json({ message: "Zalogowano pomyślnie", token });
});

// Endpoint do sprawdzania autoryzacji (zamiast cookies używa Authorization header)
app.get("/api/protected", (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Brak tokenu" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Token wygasł" });
    return res.json({ message: "Dostęp do chronionego zasobu" });
  });
});

app.listen(port, () => {
  console.log(`Serwer działa na porcie ${port}`);
});

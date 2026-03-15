require("dotenv").config();
const express = require("express");
const cors    = require("cors");

const authRoutes = require("./routes/auth");

const app  = express();
const PORT = process.env.PORT || 4000;

app.use(cors({
  origin:      process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);

app.get("/api/health", (req, res) => res.json({ status: "ok", ts: new Date() }));

app.use((req, res) => res.status(404).json({ message: "Ruta no encontrada" }));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Error interno del servidor" });
});

app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));
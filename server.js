import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";

import connectDB from "./src/config/db.js";
import userRoutes from "./src/routes/userRoutes.js";
import productRoutes from "./src/routes/productRoutes.js";

dotenv.config();

// 🔹 crear app
const app = express();

// 🔹 conectar DB
connectDB();

// 🔹 rate limit
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Demasiadas peticiones, intenta más tarde 🚫",
});

// 🔹 middlewares
app.use(cors());
app.use(express.json());
app.use(limiter);

// 🔹 rutas
app.use(userRoutes);
app.use(productRoutes);

// 🔹 ruta principal
app.get("/", (req, res) => {
  res.send("API de maquillaje funcionando 💄");
});

// 🔹 servidor
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT} 🚀`);
});
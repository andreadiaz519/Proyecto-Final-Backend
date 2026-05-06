import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import userRoutes from "./src/routes/userRoutes.js";
import productRoutes from "./src/routes/productRoutes.js";

dotenv.config();

// 🔹 PRIMERO crear app
const app = express();

// 🔹 conectar DB
connectDB();

// 🔹 middlewares
app.use(cors());
app.use(express.json());

// 🔹 rutas
app.use(userRoutes);
app.use(productRoutes);

// 🔹 ruta de prueba
app.get("/", (req, res) => {
  res.send("API de maquillaje funcionando 💄");
});

// 🔹 servidor
app.listen(3000, () => {
  console.log("Servidor corriendo en puerto 3000");
});
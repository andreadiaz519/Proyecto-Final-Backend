import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";

import connectDB from "./src/config/db.js";

import userRoutes from "./src/routes/userRoutes.js";
import productRoutes from "./src/routes/productRoutes.js";

// ======================
// CONFIG
// ======================

dotenv.config();

// ======================
// APP
// ======================

const app = express();

// ======================
// DATABASE
// ======================

connectDB();

// ======================
// RATE LIMIT
// ======================

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Demasiadas peticiones, intenta más tarde 🚫",
});

// ======================
// MIDDLEWARES
// ======================

app.use(cors());

app.use(express.json());

app.use(express.static("frontend"));

app.use(limiter);

// ======================
// ROUTES
// ======================

app.use(userRoutes);

app.use(productRoutes);

// ======================
// HOME ROUTE
// ======================

app.get("/", (req, res) => {
  res.send("API de maquillaje funcionando 💄");
});

// ======================
// SERVER
// ======================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT} 🚀`);
});
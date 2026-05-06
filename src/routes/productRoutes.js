import express from "express";

import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

import verifyToken from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/products", verifyToken, createProduct);

router.get("/products", getProducts);

router.get("/products/:id", getProductById);

router.put("/products/:id", verifyToken, updateProduct);

router.delete("/products/:id", verifyToken, deleteProduct);

export default router;
import express from "express";
import { createUser, loginUser } from "../controllers/userController.js";

const router = express.Router();

// CREAR USUARIO
router.post("/users", createUser);

// LOGIN
router.post("/login", loginUser);

export default router;
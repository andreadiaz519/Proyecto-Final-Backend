import User from "../models/User.js";
import jwt from "jsonwebtoken";

// =======================
// CREAR USUARIO
// =======================
export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ mensaje: "El usuario ya existe" });
    }

    const newUser = new User({
      name,
      email,
      password,
    });

    const savedUser = await newUser.save();

    res.status(201).json({
      mensaje: "Usuario creado correctamente",
      data: savedUser,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al crear usuario",
      error,
    });
  }
};

// =======================
// LOGIN USUARIO
// =======================
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ mensaje: "Usuario no existe" });
    }

    if (user.password !== password) {
      return res.status(400).json({ mensaje: "Contraseña incorrecta" });
    }

    const token = jwt.sign(
      { id: user._id },
      "secreto123",
      { expiresIn: "1h" }
    );

    res.json({
      mensaje: "Login exitoso 🔐",
      token,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error en login",
      error,
    });
  }
};
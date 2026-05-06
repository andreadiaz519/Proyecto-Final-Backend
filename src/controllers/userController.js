import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// registro

export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    
    if (!name || !email || !password) {
      return res.status(400).json({
        mensaje: "Todos los campos son obligatorios",
      });
    }

    // VALIDAR SI EL USUARIO EXISTE
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        mensaje: "El usuario ya existe",
      });
    }

    // ENCRIPTAR PASSWORD
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    // CREAR USUARIO
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    res.status(201).json({
      mensaje: "Usuario creado correctamente",
      data: savedUser,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al crear usuario",
      error: error.message,
    });
  }
};

// login

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    
    if (!email || !password) {
      return res.status(400).json({
        mensaje: "Todos los campos son obligatorios",
      });
    }

    
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        mensaje: "Usuario no existe",
      });
    }

    
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        mensaje: "Contraseña incorrecta",
      });
    }

    // CREAR TOKEN
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      mensaje: "Login exitoso",
      token,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error en login",
      error: error.message,
    });
  }
};
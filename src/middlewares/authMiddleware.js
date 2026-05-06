import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        mensaje: "No hay token",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        mensaje: "Token inválido",
      });
    }

    const verified = jwt.verify(token, "secreto123");

    req.user = verified;

    next();
  } catch (error) {
    return res.status(401).json({
      mensaje: "Token inválido",
    });
  }
};

export default verifyToken;
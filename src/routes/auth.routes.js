import express from "express";
import { connection } from "../database/connection.js";

const router = express.Router();


router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const [rows] = await connection.query(
      "SELECT * FROM usuarios WHERE username = ? AND password = ?",
      [username, password]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: "Usuario o contraseña incorrectos" });
    }

    
    const user = rows[0];
    res.json({ id_usuario: user.id_usuario, nombre: user.nombre, rol: user.rol });
  } catch (error) {
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
});

export default router;
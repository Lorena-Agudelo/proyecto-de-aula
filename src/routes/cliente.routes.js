import express from "express";
import { connection } from "../database/connection.js";

const router = express.Router();

router.get("/clientes", async (req, res) => {
  try {
    const [result] = await connection.query("SELECT * FROM cliente");
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener clientes" });
  }
});

router.post("/clientes", async (req, res) => {
  const { nombre, apellido, documento, telefono, correo, direccion } = req.body;
  try {
    const sql = "INSERT INTO cliente (nombre, apellido, documento, telefono, correo, direccion, fecha_registro) VALUES (?, ?, ?, ?, ?, ?, NOW())";
    await connection.query(sql, [nombre, apellido, documento, telefono, correo, direccion]);
    res.json({ message: "Cliente agregado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al agregar cliente" });
  }
});


router.delete("/clientes/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await connection.query("DELETE FROM cliente WHERE id_cliente = ?", [id]);
    res.json({ message: "Cliente eliminado" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar cliente" });
  }
});


router.put("/clientes/:id", async (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, documento, telefono, correo, direccion } = req.body;
  try {
    await connection.query(
      "UPDATE cliente SET nombre=?, apellido=?, documento=?, telefono=?, correo=?, direccion=? WHERE id_cliente=?",
      [nombre, apellido, documento, telefono, correo, direccion, id]
    );
    res.json({ message: "Cliente actualizado" });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar cliente" });
  }
});

export default router;
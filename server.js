import express from "express";
import { fileURLToPath } from 'url';
import path from 'path';
import clienteRoutes from "./src/routes/cliente.routes.js";
import authRoutes from "./src/routes/auth.routes.js";
import "./src/database/connection.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.json());
/*
app.get("/", (req, res) => {
  res.sendFile("login.html", { root: "./public" });
});*/
app.use("/api", clienteRoutes);
app.use("/api", authRoutes);
app.get("/", (req, res)=>{
res.sendFile("login.html", { root: "./public" });
})
app.use(express.static(path.join(__dirname,"public")));
app.use((req, res)=>{
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
})
app.listen(process.env.PORT, () => {
  console.log(`✅ Conectado al servidor: http://localhost:${process.env.PORT}`);
});
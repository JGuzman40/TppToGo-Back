const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const routes = require("./rutas/index"); // Importa el index.js de rutas

const server = express();

// Middlewares globales
server.use(cors());
server.use(morgan("dev"));
server.use(express.json());

// Punto de entrada para todas las rutas del backend
server.use("/api", routes);  // Ejemplo: /api/usuarios, /api/encargos, etc.

// Ruta base para verificar que el servidor está activo
server.get("/", (req, res) => {
  res.send("Servidor funcionando correctamente");
});

// Middleware de manejo de errores
server.use((err, req, res, next) => {
  console.error(err); // opcional: para ver el error en consola
  res.status(err.statusCode || 500).json({ error: err.message });
});

module.exports = server;

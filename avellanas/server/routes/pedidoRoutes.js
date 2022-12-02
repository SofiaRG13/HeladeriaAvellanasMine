//Express para agregar las rutas
const express = require("express");
const router = express.Router();

//Videojuego controller para los métodos definidos
const pedidoController = require("../controllers/pedidoController");

//Definición de rutas para productoCategoria
router.get("/", pedidoController.get);

router.get("/:id", pedidoController.getById);

module.exports = router;
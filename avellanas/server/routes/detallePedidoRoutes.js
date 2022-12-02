//Express para agregar las rutas
const express = require("express");
const router = express.Router();

//Videojuego controller para los métodos definidos
const detallePedidoController = require("../controllers/detallePedidoController");

//Definición de rutas para productoCategoria
router.get("/", detallePedidoController.get);

router.get("/:id", detallePedidoController.getById);

module.exports = router;
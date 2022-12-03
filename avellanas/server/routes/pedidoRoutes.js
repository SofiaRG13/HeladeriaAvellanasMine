//Express para agregar las rutas
const express = require("express");
const router = express.Router();

//Videojuego controller para los métodos definidos
const pedidoController = require("../controllers/pedidoController");

//Definición de rutas para productoCategoria
router.get("/", pedidoController.get);

router.post("/",pedidoController.createPedido);

router.get("/:id", pedidoController.getById);

router.put("/:id",pedidoController.updatePedido);

module.exports = router;
//Express para agregar las rutas
const express = require("express");
const router = express.Router();

//Videojuego controller para los métodos definidos
const estadoMesaController = require("../controllers/estadoMesaController");

//Definición de rutas para productoCategoria
router.get("/", estadoMesaController.get);

router.get("/:id", estadoMesaController.getById);

module.exports = router;
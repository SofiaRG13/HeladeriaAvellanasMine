//Express para agregar las rutas
const express = require("express");
const router = express.Router();

//Videojuego controller para los métodos definidos
const pagoController = require("../controllers/pagoController");

//Definición de rutas para productoCategoria
router.get("/", pagoController.get);

router.post("/",pagoController.createPago);

router.get("/:id", pagoController.getById);

module.exports = router;
//Express para agregar las rutas
const express = require("express");
const router = express.Router();

//Videojuego controller para los métodos definidos
const restauranteController = require("../controllers/restauranteController");

//Definición de rutas para restaurantes
router.get("/", restauranteController.get);

router.get("/:id", restauranteController.getById);

module.exports = router;
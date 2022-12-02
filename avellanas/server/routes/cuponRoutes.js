//Express para agregar las rutas
const express = require("express");
const router = express.Router();

//Videojuego controller para los métodos definidos
const cuponController = require("../controllers/cuponController");

//Definición de rutas para productoCategoria
router.get("/", cuponController.get);

router.get("/:id", cuponController.getById);

module.exports = router;
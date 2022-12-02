//Express para agregar las rutas
const express = require("express");
const router = express.Router();

//Videojuego controller para los métodos definidos
const productoCategoriaController = require("../controllers/productoCategoriaController");

//Definición de rutas para productoCategoria
router.get("/", productoCategoriaController.get);

router.get("/:id", productoCategoriaController.getById);

module.exports = router;
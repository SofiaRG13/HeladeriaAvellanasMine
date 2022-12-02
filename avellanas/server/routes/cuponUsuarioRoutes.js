//Express para agregar las rutas
const express = require("express");
const router = express.Router();

//Videojuego controller para los métodos definidos
const cuponUsuarioUsuarioController = require("../controllers/cuponUsuarioController");

//Definición de rutas para productoCategoria
router.get("/", cuponUsuarioController.get);

router.get("/:idUsuario,idCupon", cuponUsuarioController.getById);

module.exports = router;
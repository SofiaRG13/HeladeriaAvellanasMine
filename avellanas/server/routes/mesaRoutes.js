//Express para agregar las rutas
const express = require("express");
const router = express.Router();

//Videojuego controller para los métodos definidos
const mesaController = require("../controllers/mesaController");
const auth=require("../middleware/auth");

//Definición de rutas para productoCategoria
router.get("/",auth.grantRole(["Administrador","Mesero"]), mesaController.get);

router.post("/",auth.grantRole(["Administrador"]),mesaController.createMesa);

router.get("/:id",auth.grantRole(["Administrador","Mesero"]),mesaController.getById);

router.put("/:id",auth.grantRole(["Administrador"]),mesaController.updateMesa);

module.exports = router;
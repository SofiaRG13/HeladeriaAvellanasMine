//Express para agregar las rutas
const express = require("express");
const router = express.Router();

//Usuario controller para los métodos definidos
const usuarioController = require("../controllers/usuarioController");
const auth=require("../middleware/auth");

router.get("/",auth.grantRole(["Administrador"]),usuarioController.get);

router.get("/mesero/",usuarioController.getMesero);

router.post("/login", usuarioController.login);

router.post("/registrar", usuarioController.register);

router.get("/:id",usuarioController.getById);

router.put("/:id",auth.grantRole(["Administrador"]),usuarioController.updateUsuario);

module.exports = router;

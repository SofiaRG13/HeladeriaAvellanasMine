//Express para agregar las rutas
const express = require("express");
const router = express.Router();

//Reportes controller para los métodos definidos
const reportesController = require("../controllers/reportesController");
const auth=require("../middleware/auth");

//Definición de rutas para reportes
router.get("/vFecha",auth.grantRole(["Administrador"]),reportesController.getVentaFecha);

router.post("/vRangoFechas",auth.grantRole(["Administrador"]),reportesController.getVentaRangoFechas);

router.get("/vMedioPagoFecha",auth.grantRole(["Administrador"]),reportesController.getVentaMedioPagoFecha);

router.post("/vMedioPagoRangoFechas",auth.grantRole(["Administrador"]),reportesController.getVentaMedioPagoRangoFechas);

router.post("/vMesa",auth.grantRole(["Administrador","Mesero"]),reportesController.getVentaMesa);
router.post("/vMesero",auth.grantRole(["Administrador","Mesero"]),reportesController.getVentaMesero);
router.post("/vProducto",auth.grantRole(["Administrador","Mesero"]),reportesController.getVentaProducto);

module.exports = router;
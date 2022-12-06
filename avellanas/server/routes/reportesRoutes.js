//Express para agregar las rutas
const express = require("express");
const router = express.Router();

//Reportes controller para los métodos definidos
const reportesController = require("../controllers/reportesController");

//Definición de rutas para reportes
router.get("/vProductoRangoFechas",reportesController.getVentaProductoRangoFechas);

//router.get("/vProducto/:mes", reportesController.getVentaProductoMes);

module.exports = router;
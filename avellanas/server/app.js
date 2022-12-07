const dotEnv = require("dotenv");
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const { request, response } = require("express");
const cors = require("cors");
const logger = require("morgan");
const app = express();
const prism = new PrismaClient();

//--- Archivos de rutas ---
const productoRouter = require("./routes/productoRoutes");
const productoCategoriaRouter = require("./routes/productoCategoriaRoutes");
const mesaRoutes = require("./routes/mesaRoutes");
const estadoMesaRouter = require("./routes/estadoMesaRoutes");
const pedidoRoutes = require("./routes/pedidoRoutes");
const detallePedidoRoutes = require("./routes/detallePedidoRoutes");
const pagoRoutes = require("./routes/pagoRoutes");
const restauranteRouter = require("./routes/restauranteRoutes");
const usuarioRouter = require("./routes/usuarioRoutes");
const rolRouter = require("./routes/rolRoutes");
const reportesRoutes = require("./routes/reportesRoutes");

// Acceder a la configuracion del archivo .env
dotEnv.config();
// Puerto que escucha por defecto 300 o definido .env
const port = process.env.PORT || 3000;
// Middleware CORS para aceptar llamadas en el servidor
app.use(cors());
// Middleware para loggear las llamadas al servidor
app.use(logger("dev"));
// Middleware para gestionar Requests y Response json
app.use(express.json());
app.use(
express.urlencoded({
extended: true,
})
);
//---- Definir rutas ----
app.use("/producto/",productoRouter);
app.use("/productoCategoria/",productoCategoriaRouter);
app.use("/mesas/",mesaRoutes);
app.use("/estadoMesa/",estadoMesaRouter);
app.use("/pedido/",pedidoRoutes);
app.use("/detallepedido/",detallePedidoRoutes);
app.use("/pago/",pagoRoutes);
app.use("/restaurante/", restauranteRouter);
app.use("/usuario/", usuarioRouter);
app.use("/rol/",rolRouter);
app.use("/reporte/",reportesRoutes);

// Servidor
app.listen(port, () => {
console.log(`http://localhost:${port}`);
console.log("Presione CTRL-C para deternerlo\n");
});

const { PrismaClient, Prisma } = require("@prisma/client");

const prisma = new PrismaClient();

//REPORTE 1
//Reporte de ventas por Fecha Actual
module.exports.getVentaFecha = async (request, response, next) => {
  let fecha = new Date();

  const result = await prisma.$queryRaw(
    Prisma.sql`SELECT SUM(pedido.total) AS Total_de_Ventas FROM pedido 
        WHERE pedido.estado = 'Pagada' 
        AND YEAR(pedido.fechaPedido) = ${fecha.getFullYear()} 
        AND MONTH(pedido.fechaPedido)= ${fecha.getMonth() + 1} 
        AND DAY(pedido.fechaPedido)= ${fecha.getDate()}`
  );
  response.json(result);
};

//Reporte de ventas por Rango de Fechas
module.exports.getVentaRangoFechas = async (request, response, next) => {
  let values = request.body,
    fechaInicial = new Date(values.fechaInicial),
    fechaFinal = new Date(values.fechaFinal);

  const result = await prisma.$queryRaw(
    Prisma.sql`SELECT SUM(pedido.total) AS Total_de_Ventas FROM pedido 
        WHERE pedido.fechaPedido BETWEEN ${fechaInicial} AND ${fechaFinal}`
  );
  response.json(result);
};

//REPORTE 2
//Reporte de ventas por Medio de pago Fecha Actual
module.exports.getVentaMedioPagoFecha = async (request, response, next) => {
  let fecha = new Date();

  const result = await prisma.$queryRaw(
    Prisma.sql`SELECT d.tipoPago, SUM(d.totalPago) as Total_Ventas FROM pedido c, pago d
            WHERE d.idPedido = c.id
            AND YEAR(c.fechaPedido) = ${fecha.getFullYear()} 
            AND MONTH(c.fechaPedido)= ${fecha.getMonth() + 1} 
            AND DAY(c.fechaPedido)= ${fecha.getDate()} GROUP BY d.tipoPago`
  );
  response.json(result);
};

//Reporte de ventas por Medio de pago Rango Fechas
/* module.exports.getVentaMedioPagoRangoFechas = async (request, response, next) => {
    let values = request.body,
    fechaInicial = new Date(values.fechaInicial), 
    fechaFinal = new Date(values.fechaFinal);
    let result = null;
    result = await prisma.$queryRaw(
    Prisma.sql`SELECT d.tipoPago, SUM(d.totalPago) as Total_Ventas FROM pedido c, pago d
            WHERE d.idPedido = c.id 
            AND YEAR(c.fechaPedido) BETWEEN ${fechaInicial.getFullYear()} AND ${fechaFinal.getFullYear()} 
            AND MONTH(c.fechaPedido) BETWEEN ${fechaInicial.getMonth() + 1} AND ${fechaFinal.getMonth() + 1}  
            AND DAY(c.fechaPedido) BETWEEN ${fechaInicial.getDate()} AND ${fechaFinal.getDate()} GROUP BY d.tipoPago`
    );
   response.json(result);
}; */

//Reporte de ventas por Medio de pago Rango Fechas
module.exports.getVentaMedioPagoRangoFechas = async (
  request,
  response,
  next
) => {
  let values = request.body,
    fechaInicial = new Date(values.fechaInicial),
    fechaFinal = new Date(values.fechaFinal);
  let result = null;
  result = await prisma.$queryRaw(
    Prisma.sql`SELECT d.tipoPago,SUM(d.totalPago) as Total_Ventas FROM pedido c, pago d
    WHERE d.idPedido = c.id 
    AND c.fechaPedido BETWEEN ${fechaInicial} AND ${fechaFinal} GROUP BY d.tipoPago`
  );
  response.json(result);
};

//REPORTE 3

//Reporte por Mesa
module.exports.getVentaMesa = async (request, response, next) => {
  let values = request.body,
  fechaInicial = new Date(values.fechaInicial), 
  fechaFinal = new Date(values.fechaFinal);
  let id = values.id; 
  const result = await prisma.$queryRaw(
    Prisma.sql`SELECT m.codigo AS Nombre, SUM(o.total) AS Total_Ventas FROM pago f INNER JOIN pedido o ON f.idPedido= o.id INNER JOIN mesa m ON o.idMesa=m.id
    WHERE o.fechaPedido BETWEEN ${fechaInicial} and ${fechaFinal} and o.idMesa=${id}`
  )
  response.json(result);
};

//Reporte por Mesero
module.exports.getVentaMesero = async (request, response, next) => {
  let values = request.body;
  fechaInicial = new Date(values.fechaInicial);
  fechaFinal = new Date(values.fechaFinal);
  let id = values.id;  
  const result = await prisma.$queryRaw(
    Prisma.sql`SELECT u.nombre AS Nombre, SUM(f.total) AS Total_Ventas FROM pedido f INNER JOIN usuario u ON f.idUsuario= u.id
    WHERE f.fechaPedido BETWEEN ${fechaInicial} AND ${fechaFinal} AND u.rol='Mesero' AND u.id=${id}`
  )
  response.json(result);
};

//Reporte por producto
module.exports.getVentaProducto = async (request, response, next) => {
  let values = request.body,
  fechaInicial = new Date(values.fechaInicial), 
  fechaFinal = new Date(values.fechaFinal);
  let id = values.id;  
  const result = await prisma.$queryRaw(
    Prisma.sql`SELECT  p.nombre AS Nombre, SUM(f.total) AS Total_Ventas FROM pedido f INNER JOIN detallepedido o ON f.id= o.idPedido
    INNER JOIN producto p ON o.idProducto= p.id  WHERE f.fechaPedido BETWEEN ${fechaInicial} and ${fechaFinal} and p.id=${id}`
  )
  response.json(result);
};
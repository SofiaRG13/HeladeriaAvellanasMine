const {  PrismaClient, Prisma } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports.getVentaProductoRangoFechas = async (request, response, next) => {
    let mes = parseInt(request.params.mes)|1; 
    const result = await prisma.$queryRaw(
        Prisma.sql`SELECT v.nombre, (SUM(ov.cantidad)*v.precio) as total FROM orden o, ordenonvideojuego ov, videojuego v WHERE o.id=ov.ordenId and ov.videojuegoId=v.id GROUP BY ov.videojuegoId ORDER BY total DESC`
    )
    //SELECT v.nombre, (SUM(ov.cantidad)*v.precio) as total FROM orden o, ordenonvideojuego ov, videojuego v WHERE o.id=ov.ordenId and ov.videojuegoId=v.id GROUP BY ov.videojuegoId ORDER BY total DESC;
    response.json(result);
};

module.exports.getVentaMedioPago = async (request, response, next) => {
    let mes = parseInt(request.params.mes)|1; 
    const result = await prisma.$queryRaw(
        Prisma.sql`SELECT v.nombre, (SUM(ov.cantidad)*v.precio) as total FROM orden o, ordenonvideojuego ov, videojuego v WHERE o.id=ov.ordenId and ov.videojuegoId=v.id GROUP BY ov.videojuegoId ORDER BY total DESC`
    )
    //SELECT v.nombre, (SUM(ov.cantidad)*v.precio) as total FROM orden o, ordenonvideojuego ov, videojuego v WHERE o.id=ov.ordenId and ov.videojuegoId=v.id GROUP BY ov.videojuegoId ORDER BY total DESC;
    response.json(result);
};

module.exports.getVentaMesaMeseroProducto = async (request, response, next) => {
    let mes = parseInt(request.params.mes)|1; 
    const result = await prisma.$queryRaw(
        Prisma.sql`SELECT v.nombre, (SUM(ov.cantidad)*v.precio) as total FROM orden o, ordenonvideojuego ov, videojuego v WHERE o.id=ov.ordenId and ov.videojuegoId=v.id GROUP BY ov.videojuegoId ORDER BY total DESC`
    )
    //SELECT v.nombre, (SUM(ov.cantidad)*v.precio) as total FROM orden o, ordenonvideojuego ov, videojuego v WHERE o.id=ov.ordenId and ov.videojuegoId=v.id GROUP BY ov.videojuegoId ORDER BY total DESC;
    response.json(result);
};

/* module.exports.getVentaProductoMes = async (request, response, next) => {
    let mes = parseInt(request.params.mes)|1; 
    const result = await prisma.$queryRaw(
        Prisma.sql`SELECT v.nombre, SUM(ov.cantidad) as suma FROM orden o, ordenonvideojuego ov, videojuego v WHERE o.id=ov.ordenId and ov.videojuegoId=v.id AND MONTH(o.fechaOrden) = ${mes} GROUP BY ov.videojuegoId`
    )
    //SELECT v.nombre, SUM(ov.cantidad) as suma FROM orden o, ordenonvideojuego ov, videojuego v WHERE o.id=ov.ordenId and ov.videojuegoId=v.id AND MONTH(o.fechaOrden) = 10 GROUP BY ov.videojuegoId
    response.json(result);
}; */


const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
//Obtener listado
module.exports.get = async (request, response, next) => {
  const detallepedido = await prisma.detallepedido.findMany();
  response.json(detallepedido);
};

//Obtener por Id
module.exports.getByIdPedido = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const detallepedido = await prisma.detallepedido.findMany({
    where: {
      idPedido: id,
    },
  });
  response.json(detallepedido);
};

//Crear pedido
module.exports.createDetallePedido = async (infoPedido, response, next) => {
  let detallepedido = infoPedido.body;

  const datosPedido = await prisma.pedido.findMany();
  let cantidadDatos = datosPedido.length;
  let pedido = datosPedido[cantidadDatos - 1];
  let idPedido = pedido.id;

  const newDetallePedido = await prisma.DetallePedido.create({
    data: {
      idProducto: detallepedido.product.id,
      idPedido: idPedido,
      cantidad: detallepedido.cantidad,
      notas: detallepedido.notas,
    },
  });
  response.json(newDetallePedido);
};

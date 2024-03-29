const { PrismaClient, EstadoPedido } = require("@prisma/client");

const prisma = new PrismaClient();
//Obtener listado
module.exports.get = async (request, response, next) => {
  const pedidos = await prisma.pedido.findMany({
    include: {
      mesa: true,
      usuario: true,
    },
  });
  response.json(pedidos);
};

//Obtener por Id
module.exports.getById = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const pedido = await prisma.pedido.findUnique({
    where: {
      id: id,
    },
    include: {
      mesa: true,
      usuario: true,
      productos: {
        select: {
          producto: true,
          cantidad: true,
          notas: true,
        },
      },
    },
  });
  response.json(pedido);
};

//Obtener por Id Usuario
module.exports.getByIdUsuario = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const pedido = await prisma.pedido.findMany({
    where: {
      idUsuario: id,
    },
    include: {
      usuario: true,
      productos: {
        select: {
          producto: true,
          cantidad: true,
          notas: true,
        },
      },
    },
  });
  response.json(pedido);
};

//Crear pedido
module.exports.createPedido = async (infoPedido, response, next) => {
  let pedido = infoPedido.body;
  const newPedido = await prisma.pedido.create({
    data: {
      idUsuario: pedido.idUsuario,
      estado: pedido.estado,
      tipoPedido: pedido.tipoPedido,
      idMesa: pedido.idMesa,
      fechaPedido: pedido.fechaPedido,
      subtotal: pedido.subtotal,
      descuento: pedido.descuento,
      impuesto: pedido.impuesto,
      total: pedido.total,
    },
  });
  response.json(newPedido);
};

//Actualizar pedido
module.exports.updatePedido = async (infopedido, response, next) => {
  let pedido = infopedido.body;
  let idpedido = parseInt(infopedido.params.id);

  //Obtener videojuego viego (anterior)
  const pedidoVieja = await prisma.pedido.findUnique({
    where: { id: idpedido },
  });

  const newPedido = await prisma.pedido.update({
    where: {
      id: idpedido,
    },
    data: {
      idUsuario: pedido.idUsuario,
      estado: {
        disconnect: pedidoVieja.estado,
        connect: pedido.estado,
      },
      tipoPedido: {
        disconnect: pedidoVieja.tipoPedido,
        connect: pedido.tipoPedido,
      },
      idMesa: pedido.idMesa,
      fechaPedido: pedido.fechaPedido,
      subtotal: pedido.subtotal,
      descuento: pedido.descuento,
      impuesto: pedido.impuesto,
      total: pedido.total,
    },
  });
  response.json(newPedido);
};

//Actualizar estado pedido
module.exports.updateEstadoPedidoPorEntregar = async (
  infoPedido,
  response,
  next
) => {
  let idPedido = parseInt(infoPedido.params.id);

  const newMesa = await prisma.pedido.update({
    where: {
      id: idPedido,
    },
    data: {
      estado: EstadoPedido.Por_Entregar,
    },
  });
  response.json(newMesa);
};

//Actualizar estado pedido
module.exports.updateEstadoPedidoPagada = async (
  infoPedido,
  response,
  next
) => {
  let idPedido = parseInt(infoPedido.params.id);

  const newMesa = await prisma.pedido.update({
    where: {
      id: idPedido,
    },
    data: {
      estado: EstadoPedido.Pagada,
    },
  });
  response.json(newMesa);
};

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
//Obtener listado
module.exports.get = async (request, response, next) => {
  const pagos = await prisma.pago.findMany();
  response.json(pagos);
};

//Obtener por Id
module.exports.getById = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const pago = await prisma.pago.findUnique({
    where: {
      id: id,
    },
    include: {},
  });
  response.json(pago);
};

//Crear pago
module.exports.createPago = async (infoPago, response, next) => {
  let pago = infoPago.body;
  const newPago = await prisma.pago.create({
    data: {
      idPedido: pago.idUsuarioPedido,
      tipoPago: pago.tipoPago,
      totalPago: pago.totalPago,
    },
  });
  response.json(newPago);
};

//Actualizar pago
module.exports.updatePago = async (infoPago, response, next) => {
  let pago = infoPago.body;
  let idPago = parseInt(infoPago.params.id);

  //Obtener videojuego viego (anterior)
  const pagoVieja = await prisma.pago.findUnique({
    where: { id: idPago },
  });

  const newPago = await prisma.pago.update({
    where: {
      id: idPago,
    },
    data: {
        idPedido: pago.idUsuarioPedido,
        tipoPago: pago.tipoPago,
        totalPago: pago.totalPago,
    },
  });
  response.json(newPago);
};

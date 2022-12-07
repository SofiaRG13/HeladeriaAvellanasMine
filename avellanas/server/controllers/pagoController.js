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
      idPedido: pago.idPedido,
      tipoPago: pago.tipoPago,
      totalPago: pago.totalPago,
    },
  });
  response.json(newPago);
};


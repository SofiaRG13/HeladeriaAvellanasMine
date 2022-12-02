const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports.get = async (request, response, next) => {
  const restaurantes = await prisma.restaurante.findMany();
  response.json(restaurantes);
};

module.exports.getById = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const restaurante = await prisma.restaurante.findUnique({
    where: {
      id: id,
    },
    include: {
      mesas: true,
      productos:true,
    },
  });
  response.json(restaurante);
};
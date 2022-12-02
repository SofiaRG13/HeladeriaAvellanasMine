const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

//Obtener listado
module.exports.get = async (request, response, next) => {
  const categorias = await prisma.productoCategoria.findMany();
  response.json(categorias);
};

//Obtener por Id
module.exports.getById = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const categoria = await prisma.productoCategoria.findUnique({
    where: {
      id: id,
    }
  });
  response.json(categoria);
};
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

//Obtener listado
module.exports.get = async (request, response, next) => {
  const cupones = await prisma.cupon.findMany();
  response.json(cupones);
};

//Obtener por Id
module.exports.getById = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const cupon = await prisma.cupon.findUnique({
    where: {
      id: id,
    }
  });
  response.json(cupon);
};

//Crear cupon
module.exports.createCupon = async (infoCupon, response, next) => {
  let cupon = infoCupon.body;
  const newCupon = await prisma.cupon.create({
    data: {
      descripcion: cupon.descripcion,
      descuento: cupon.descuento,
    },
  });
  response.json(newCupon);
};

//Actualizar cupon
module.exports.updateCupon = async (infoCupon, response, next) => {
  let cupon = infoCupon.body;
  let idCupon = parseInt(infoCupon.params.id);

  //Obtener videojuego viego (anterior)
  const cuponViejo = await prisma.cupon.findUnique({
    where: { id: idCupon },
  });

  const newCupon = await prisma.cupon.update({
    where: {
      id: idCupon,
    },
    data: {
      descripcion: cupon.descripcion,
      descuento: cupon.descuento,
    },
  });
  response.json(newCupon);
};
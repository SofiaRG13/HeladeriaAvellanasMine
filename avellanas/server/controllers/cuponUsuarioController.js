const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

//Obtener listado
module.exports.get = async (request, response, next) => {
  const cuponesUsuario = await prisma.cuponUsuario.findMany();
  response.json(cuponesUsuario);
};

//Obtener por Id
module.exports.getById = async (request, response, next) => {
  let idUsuario = parseInt(request.params.idUsuario);
  let idCupon = parseInt(request.params.idCupon);
  const cuponUsuario = await prisma.cuponUsuario.findUnique({
    where: {
      idUsuario: idUsuario,
      idCupon: idCupon,
    }
  });
  response.json(cuponUsuario);
};

//Crear cuponUsuario
module.exports.createCuponUsuario = async (infoCuponUsuario, response, next) => {
  let cuponUsuario = infoCuponUsuario.body;
  const newCuponUsuario = await prisma.cuponUsuario.create({
    data: {
      estado:{
        disconnect: cuponUsuarioViejo.estado,
        connect: cuponUsuario.estado.estado,
      }
    },
  });
  response.json(newCuponUsuario);
};

//Actualizar cuponUsuario
module.exports.updateCuponUsuario = async (infoCuponUsuario, response, next) => {
  let cuponUsuario = infoCuponUsuario.body;
  let idUsuario = parseInt(request.params.idUsuario);
  let idCupon = parseInt(request.params.idCupon);

  //Obtener videojuego viego (anterior)
  const cuponUsuarioViejo = await prisma.cuponUsuario.findUnique({
    where: { 
        idUsuario: idUsuario,
        idCupon: idCupon, 
    },
  });

  const newCuponUsuario = await prisma.cuponUsuario.update({
    where: {
        idUsuario: idUsuario,
        idCupon: idCupon,
    },
    data: {
        estado:{
            disconnect: cuponUsuarioViejo.estado,
            connect: cuponUsuario.estado,
          }
    },
  });
  response.json(newCuponUsuario);
};
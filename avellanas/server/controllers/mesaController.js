const { PrismaClient, EstadoMesa } = require("@prisma/client");

const prisma = new PrismaClient();
//Obtener listado
module.exports.get = async (request, response, next) => {
  const mesas = await prisma.mesa.findMany({
    include: {
      restaurante: true,
    },
  });
  response.json(mesas);
};

//Obtener por Id
module.exports.getById = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const mesa = await prisma.mesa.findUnique({
    where: {
      id: id,
    },
    include: {
      restaurante: true,
    },
  });
  response.json(mesa);
};

//Crear mesa
module.exports.createMesa = async (infoMesa, response, next) => {
  let mesa = infoMesa.body;
  const newMesa = await prisma.mesa.create({
    data: {
      nombre: mesa.nombre,
      codigo: mesa.codigo,
      estado: mesa.estado,
      capacidad: mesa.capacidad,
      idRestaurante: mesa.idRestaurante,
    },
  });
  response.json(newMesa);
};

//Actualizar mesa
module.exports.updateMesa = async (infoMesa, response, next) => {
  let mesa = infoMesa.body;
  let idMesa = parseInt(infoMesa.params.id);

  //Obtener videojuego viego (anterior)
  const mesaVieja = await prisma.mesa.findUnique({
    where: { id: idMesa },
  });

  const newMesa = await prisma.mesa.update({
    where: {
      id: idMesa,
    },
    data: {
      codigo: mesa.codigo,
      descripcion: mesa.descripcion,
      capacidad: mesa.capacidad,
      codRestaurante: mesa.codRestaurante,
      estado: mesa.estado,
    },
  });
  response.json(newMesa);
};

//Actualizar mesa Estado Ocupada
module.exports.updateEstadoOcupada = async (infoMesa, response, next) => {
  let idMesa = parseInt(infoMesa.params.id);

  const newMesa = await prisma.mesa.update({
    where: {
      id: idMesa,
    },
    data: {
      estado: EstadoMesa.Ocupada,
    },
  });
  response.json(newMesa);
};

//Actualizar mesa Estado Desocupada
module.exports.updateEstadoDesocupada = async (infoMesa, response, next) => {
  let idMesa = parseInt(infoMesa.params.id);

  const newMesa = await prisma.mesa.update({
    where: {
      id: idMesa,
    },
    data: {
      estado: EstadoMesa.Desocupada,
    },
  });
  response.json(newMesa);
};

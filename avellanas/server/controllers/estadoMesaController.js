const { PrismaClient, EstadoMesa } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports.get = async (request, response, next) => {
  let listEstados = [];
  for (let element in EstadoMesa) {
    switch (element) {
      case EstadoMesa.Desocupada:
        listEstados.unshift({
          ["id"]: element,
          ["estado"]: "Desocupada",
        });
        break;
      case EstadoMesa.Ocupada:
        listEstados.unshift({
          ["id"]: element,
          ["estado"]: "Ocupada",
        });
        break;
      default:
        listEstados.unshift({
          ["id"]: EstadoMesa.Desocupada,
          ["estado"]: "Desocupada",
        });
        break;
    }
  }

  response.json(listEstados);
};

module.exports.getById = async (request, response, next) => {
  let id = request.params.id;
  let estado = "";
  switch (EstadoMesa[id]) {
    case EstadoMesa.Desocupada:
      estado = "Desocupada";
      break;
    case EstadoMesa.Ocupada:
      estado = "Ocupada";
      break;
    default:
      estado = "Desocupada";
      break;
  }
  let estadoMesa = { ["id"]: EstadoMesa[id], ["nombre"]: estado };
  response.json(estadoMesa);
};

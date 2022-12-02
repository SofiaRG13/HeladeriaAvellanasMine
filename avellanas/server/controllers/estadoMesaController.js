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
      case EstadoMesa.Reservada:
        listEstados.unshift({
          ["id"]: element,
          ["estado"]: "Reservada",
        });
        break;
      case EstadoMesa.Inactiva:
        listEstados.unshift({
          ["id"]: element,
          ["estado"]: "Inactiva",
        });
        break;
      case EstadoMesa.Por_Pagar:
        listEstados.unshift({
          ["id"]: element,
          ["estado"]: "Por_Pagar",
        });
        break;
      case EstadoMesa.Pedido_Registrado:
        listEstados.unshift({
          ["id"]: element,
          ["estado"]: "Pedido_Registrado",
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
    case EstadoMesa.Reservada:
      estado = "Reservada";
      break;
    case EstadoMesa.Inactiva:
      estado = "Inactiva";
      break;
    case EstadoMesa.Por_Pagar:
      estado = "Por_Pagar";
      break;
    case EstadoMesa.Pedido_Registrado:
      estado = "Pedido_Registrado";
      break;
    default:
      estado = "Desocupada";
      break;
  }
  let estadoMesa = { ["id"]: EstadoMesa[id], ["nombre"]: estado };
  response.json(estadoMesa);
};

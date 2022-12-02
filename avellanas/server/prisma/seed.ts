import { PrismaClient, TipoPago } from "@prisma/client";
import { productoCategoria } from "./seeds/categoriasProducto";
import { restaurantes } from "./seeds/restaurantes";
import { cupones } from "./seeds/cupon";
import { EstadoMesa } from "@prisma/client";
import { EstadoCupon } from "@prisma/client";
import { EstadoPedido, TipoPedido, Rol } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  //categoriasProducto
  await prisma.productoCategoria.createMany({
    data: productoCategoria,
  });
  //cupones
  await prisma.cupon.createMany({
    data: cupones,
  });
  //restaurantes
  await prisma.restaurante.createMany({
    data: restaurantes,
  });
  //usuarios
  await prisma.usuario.create({
    //Instancia de usuario 1
    data: {
      email: "admin1@prueba.com",
      nombre: "usuarioAdmin1",
      apellido1: "usuarioAdmin1.1",
      apellido2: "usuarioAdmin1.2",
      contrasenna:
        "$2b$10$1BaQqXuZYNLDAC42PY5fN.ufSOKjApmjkaZrQUYf7ms71PaS1mASO",
      rol: Rol.Administrador,
      idRestaurante: null,
    },
  });
  await prisma.usuario.create({
    //Instancia de usuario 2
    data: {
      email: "usuario-admin2@prueba.com",
      nombre: "usuarioAdmin2",
      apellido1: "usuarioAdmin2.1",
      apellido2: "usuarioAdmin2.2",
      contrasenna:
        "$2b$10$1BaQqXuZYNLDAC42PY5fN.ufSOKjApmjkaZrQUYf7ms71PaS1mASO",
      rol: Rol.Administrador,
      idRestaurante: null,
    },
  });
  await prisma.usuario.create({
    //Instancia de usuario 3
    data: {
      email: "usuario-cliente1@prueba.com",
      nombre: "usuarioCliente1",
      apellido1: "usuarioCliente1.1",
      apellido2: "usuarioCliente1.2",
      contrasenna:
        "$2b$10$1BaQqXuZYNLDAC42PY5fN.ufSOKjApmjkaZrQUYf7ms71PaS1mASO",
      idRestaurante: null,
    },
  });
  await prisma.usuario.create({
    //Instancia de usuario 4
    data: {
      email: "usuario-cliente2@prueba.com",
      nombre: "usuarioCliente2",
      apellido1: "usuarioCliente2.1",
      apellido2: "usuarioCliente2.2",
      contrasenna:
        "$2b$10$1BaQqXuZYNLDAC42PY5fN.ufSOKjApmjkaZrQUYf7ms71PaS1mASO",
      idRestaurante: null,
    },
  });
  await prisma.usuario.create({
    //Instancia de usuario 5
    data: {
      email: "usuario-mesero1@prueba.com",
      nombre: "usuarioMesero1",
      apellido1: "usuarioMesero1.1",
      apellido2: "usuarioMesero1.2",
      contrasenna:
        "$2b$10$1BaQqXuZYNLDAC42PY5fN.ufSOKjApmjkaZrQUYf7ms71PaS1mASO",
      rol: Rol.Mesero,
      idRestaurante: 1,
    },
  });
  await prisma.usuario.create({
    //Instancia de usuario 6
    data: {
      email: "usuario-mesero2@prueba.com",
      nombre: "usuarioMesero2",
      apellido1: "usuarioMesero2.1",
      apellido2: "usuarioMesero2.2",
      contrasenna:
        "$2b$10$1BaQqXuZYNLDAC42PY5fN.ufSOKjApmjkaZrQUYf7ms71PaS1mASO",
      rol: Rol.Mesero,
      idRestaurante: 2,
    },
  });
  //cuponUsuario
  await prisma.cuponUsuario.create({
    //Instancia de cuponUsuario 1
    data: {
      idUsuario: 1,
      idCupon: 1,
      estado: EstadoCupon.Activo,
    },
  });
  await prisma.cuponUsuario.create({
    //Instancia de cuponUsuario 2
    data: {
      idUsuario: 2,
      idCupon: 2,
      estado: EstadoCupon.Inactivo,
    },
  });
  await prisma.cuponUsuario.create({
    //Instancia de cuponUsuario 3
    data: {
      idUsuario: 3,
      idCupon: 3,
      estado: EstadoCupon.Vencido,
    },
  });
  await prisma.cuponUsuario.create({
    //Instancia de cuponUsuario 4
    data: {
      idUsuario: 4,
      idCupon: 4,
      estado: EstadoCupon.Activo,
    },
  });
  //mesas
  await prisma.mesa.create({
    //Instancia de mesa 1
    data: {
      codigo: "AVA-1",
      estado: EstadoMesa.Ocupada,
      capacidad: 4,
      idRestaurante: 1,
    },
  });

  await prisma.mesa.create({
    //Instancia de mesa 2
    data: {
      codigo: "AVA-2",
      estado: EstadoMesa.Ocupada,
      capacidad: 4,
      idRestaurante: 1,
    },
  });

  await prisma.mesa.create({
    //Instancia de mesa 3
    data: {
      codigo: "AVA-3",
      estado: EstadoMesa.Desocupada,
      capacidad: 4,
      idRestaurante: 1,
    },
  });

  await prisma.mesa.create({
    //Instancia de mesa 4
    data: {
      codigo: "AVA-4",
      estado: EstadoMesa.Desocupada,
      capacidad: 4,
      idRestaurante: 1,
    },
  });
  //Productos
  await prisma.producto.create({
    //Instancia de Producto 1 CATEGORIA 1
    data: {
      nombre: "Paleta de Cas",
      descripcion: "Helado a base de agua sabor a cas",
      ingredientes: "Agua, azúcar, pulpa de cas, cas.",
      precio: "850",
      idCategoria: 1,
      imagen: "./assets/images/paleta-cas.jpg",
      restaurantes: {
        connect: [
          { id: 1 },
          { id: 2 },
          { id: 3 },
          { id: 4 },
          { id: 5 },
          { id: 6 },
        ],
      },
    },
  });

  await prisma.producto.create({
    //Instancia de Producto 2 CATEGORIA 1
    data: {
      nombre: "Paleta de Frutas",
      descripcion: "Helado a base de agua sabor a frutas",
      ingredientes: "Agua, sirope, azúcar, papaya, piña, banana, sandía.",
      precio: "850",
      idCategoria: 1,
      imagen: "./assets/images/paleta-frutas.jpg",
      restaurantes: {
        connect: [{ id: 1 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }],
      },
    },
  });

  await prisma.producto.create({
    //Instancia de Producto 3 CATEGORIA 1
    data: {
      nombre: "Paleta de Mora",
      descripcion: "Helado a base de agua sabor a mora",
      ingredientes: "Agua, azúcar, pulpa de mora, mora.",
      precio: "850",
      idCategoria: 1,
      imagen: "./assets/images/paleta-mora.jpg",
      restaurantes: {
        connect: [
          { id: 1 },
          { id: 2 },
          { id: 3 },
          { id: 4 },
          { id: 5 },
          { id: 6 },
        ],
      },
    },
  });

  await prisma.producto.create({
    //Instancia de Producto 1 CATEGORIA 2
    data: {
      nombre: "Helado de Vainilla",
      descripcion: "Helado a base de leche sabor a vainilla",
      ingredientes: "Leche, leche condensada, escencia de vainilla.",
      precio: "1200",
      idCategoria: 2,
      imagen: "./assets/images/helado-vainilla.jpg",
      restaurantes: {
        connect: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 6 }],
      },
    },
  });

  await prisma.producto.create({
    //Instancia de Producto 2 CATEGORIA 2
    data: {
      nombre: "Helado de Fresa",
      descripcion: "Helado a base de leche sabor a fresa",
      ingredientes: "Leche, leche condensada, leche evaporada, fresa.",
      precio: "1200",
      idCategoria: 2,
      imagen: "./assets/images/helado-fresa.jpg",
      restaurantes: {
        connect: [{ id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }],
      },
    },
  });

  await prisma.producto.create({
    //Instancia de Producto 3 CATEGORIA 2
    data: {
      nombre: "Helado de Chocolate",
      descripcion: "Helado a base de leche sabor a chocolate",
      ingredientes: "Leche, leche condensada, cocoa en polvo.",
      precio: "1200",
      idCategoria: 2,
      imagen: "./assets/images/helado-chocolate.jpg",
      restaurantes: {
        connect: [
          { id: 1 },
          { id: 2 },
          { id: 3 },
          { id: 4 },
          { id: 5 },
          { id: 6 },
        ],
      },
    },
  });

  await prisma.producto.create({
    //Instancia de Producto 1 CATEGORIA 3
    data: {
      nombre: "Helado de Menta",
      descripcion: "Helado a base de yogurt sabor a menta",
      ingredientes:
        "Yogurt, leche condensada, escencia de menta, hojas de menta.",
      precio: "1400",
      idCategoria: 3,
      imagen: "./assets/images/helado-menta.jpg",
      restaurantes: {
        connect: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }],
      },
    },
  });

  await prisma.producto.create({
    //Instancia de Producto 2 CATEGORIA 3
    data: {
      nombre: "Helado de Arándano",
      descripcion: "Helado a base de yogurt sabor a arándano",
      ingredientes: "Yogurt, leche condensada, arándano, aroma de vainilla.",
      precio: "1400",
      idCategoria: 3,
      imagen: "./assets/images/helado-arandano.jpg",
      restaurantes: {
        connect: [
          { id: 1 },
          { id: 2 },
          { id: 3 },
          { id: 4 },
          { id: 5 },
          { id: 6 },
        ],
      },
    },
  });

  await prisma.producto.create({
    //Instancia de Producto 3 CATEGORIA 3
    data: {
      nombre: "Helado de Chicle",
      descripcion: "Helado a base de yogurt sabor a chicle",
      ingredientes: "Yogurt, leche condensada, escencia de chicle.",
      precio: "1400",
      idCategoria: 3,
      imagen: "./assets/images/helado-chicle.jpg",
      restaurantes: {
        connect: [
          { id: 1 },
          { id: 2 },
          { id: 3 },
          { id: 4 },
          { id: 5 },
          { id: 6 },
        ],
      },
    },
  });

  await prisma.producto.create({
    //Instancia de Producto 1 CATEGORIA 4
    data: {
      nombre: "Banana Split",
      descripcion: "Postre de banana cortada con helado y toppings",
      ingredientes:
        "Banana, helado de chocolate, helado de fresa, helado de vainilla, sirope de chocolate, avellana, galleta, crema batida.",
      precio: "1850",
      idCategoria: 4,
      imagen: "./assets/images/bananasplit.jpg",
      restaurantes: {
        connect: [
          { id: 1 },
          { id: 2 },
          { id: 3 },
          { id: 4 },
          { id: 5 },
          { id: 6 },
        ],
      },
    },
  });

  await prisma.producto.create({
    //Instancia de Producto 2 CATEGORIA 4
    data: {
      nombre: "Canasta de frutas",
      descripcion: "Canasta de frutas de temporada con helado de vainilla.",
      ingredientes:
        "Canasta de trigo, naranja, fresa, kiwi, manzana verde, durazno, banana, piña, leche condensada, helado de vainilla.",
      precio: "1800",
      idCategoria: 4,
      imagen: "./assets/images/canasta-frutas.jpg",
      restaurantes: {
        connect: [
          { id: 1 },
          { id: 2 },
          { id: 3 },
          { id: 4 },
          { id: 5 },
          { id: 6 },
        ],
      },
    },
  });

  await prisma.producto.create({
    //Instancia de Producto 3 CATEGORIA 4
    data: {
      nombre: "Churchill",
      descripcion:
        "Postre tradicional de Costa Rica, variante del típico granizado",
      ingredientes:
        "Hielo frappe, sirope de cola, leche condensada, leche en polvo, helado de vainilla, barquillos de chocolate",
      precio: "1750",
      idCategoria: 4,
      imagen: "./assets/images/churchill.jpg",
      restaurantes: {
        connect: [{ id: 6 }],
      },
    },
  });

  await prisma.producto.create({
    //Instancia de Producto 4 CATEGORIA 4
    data: {
      nombre: "Helado de Avellana",
      descripcion: "Helado a base de leche sabor a avellanas",
      ingredientes: "Leche, leche condensada, avellana tostada, miel.",
      precio: "1500",
      idCategoria: 4,
      imagen: "./assets/images/helado-avellana.jpg",
      restaurantes: {
        connect: [
          { id: 1 },
          { id: 2 },
          { id: 3 },
          { id: 4 },
          { id: 5 },
          { id: 6 },
        ],
      },
    },
  });

  await prisma.producto.create({
    //Instancia de Producto 1 CATEGORIA 5
    data: {
      nombre: "Smoothie de Frutas",
      descripcion: "Batido a base de agua y fruta.",
      ingredientes: "Agua, hielo, azúcar, sandía, banana, papaya, piña, mango",
      precio: "1200",
      idCategoria: 5,
      imagen: "./assets/images/Fruit-Smoothie.webp",
      restaurantes: {
        connect: [
          { id: 1 },
          { id: 2 },
          { id: 3 },
          { id: 4 },
          { id: 5 },
          { id: 6 },
        ],
      },
    },
  });

  await prisma.producto.create({
    //Instancia de Producto 2 CATEGORIA 5
    data: {
      nombre: "Smoothie de Mora",
      descripcion: "Batido a base de agua y mora.",
      ingredientes: "Agua, azúcar, hielo, mora, pulpa de mora.",
      precio: "1200",
      idCategoria: 5,
      imagen: "./assets/images/Blackberry-Smoothie.jpg",
      restaurantes: {
        connect: [
          { id: 1 },
          { id: 2 },
          { id: 3 },
          { id: 4 },
          { id: 5 },
          { id: 6 },
        ],
      },
    },
  });

  await prisma.producto.create({
    //Instancia de Producto 3 CATEGORIA 5
    data: {
      nombre: "Smoothie de Cas",
      descripcion: "Batido a base de agua y cas.",
      ingredientes: "Agua, azúcar, hielo, pulpa de cas.",
      precio: "1200",
      idCategoria: 5,
      imagen: "./assets/images/cas-smoothie.jpg",
      restaurantes: {
        connect: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
      },
    },
  });

  await prisma.producto.create({
    //Instancia de Producto 1 CATEGORIA 6
    data: {
      nombre: "MilkShake de Vainilla",
      descripcion: "Batido a base de leche sabor a vainilla.",
      ingredientes:
        "Leche, azúcar, hielo, helado de vainilla, escencia de vainilla, crema batida.",
      precio: "1500",
      idCategoria: 6,
      imagen: "./assets/images/vanilla-milkshake.jpg",
      restaurantes: {
        connect: [
          { id: 1 },
          { id: 2 },
          { id: 3 },
          { id: 4 },
          { id: 5 },
          { id: 6 },
        ],
      },
    },
  });

  await prisma.producto.create({
    //Instancia de Producto 2 CATEGORIA 6
    data: {
      nombre: "MilkShake de Fresa",
      descripcion: "Batido a base de leche sabor a fresa.",
      ingredientes:
        "Leche, azúcar, hielo, helado de vainilla, fresa, crema batida.",
      precio: "1500",
      idCategoria: 6,
      imagen: "./assets/images/strawberry-milkshake.webp",
      restaurantes: {
        connect: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 6 }],
      },
    },
  });

  await prisma.producto.create({
    //Instancia de Producto 3 CATEGORIA 6
    data: {
      nombre: "MilkShake de Chocolate",
      descripcion: "Batido a base de leche sabor a chocolate.",
      ingredientes:
        "Leche, azúcar, hielo, helado de vainilla, cocoa en polvo, crema batida.",
      precio: "1500",
      idCategoria: 6,
      imagen: "./assets/images/chocolate-milkshake.jpg",
      restaurantes: {
        connect: [
          { id: 1 },
          { id: 2 },
          { id: 3 },
          { id: 4 },
          { id: 5 },
          { id: 6 },
        ],
      },
    },
  });

  await prisma.producto.create({
    //Instancia de Producto 1 CATEGORIA 7
    data: {
      nombre: "Batido de Arándanos",
      descripcion: "Batido a base de yogurt sabor a arándanos.",
      ingredientes: "Yogurt, azúcar, hielo, arándano.",
      precio: "1700",
      idCategoria: 7,
      imagen: "./assets/images/blueberry-yogurt.jpg",
      restaurantes: {
        connect: [
          { id: 1 },
          { id: 2 },
          { id: 3 },
          { id: 4 },
          { id: 5 },
          { id: 6 },
        ],
      },
    },
  });

  await prisma.producto.create({
    //Instancia de Producto 2 CATEGORIA 7
    data: {
      nombre: "Batido de Menta",
      descripcion: "Batido a base de yogurt sabor a menta.",
      ingredientes: "Yogurt, azúcar, hielo, hojas de menta, escencia de menta.",
      precio: "1700",
      idCategoria: 7,
      imagen: "./assets/images/mint-yogurt.jpg",
      restaurantes: {
        connect: [
          { id: 1 },
          { id: 2 },
          { id: 3 },
          { id: 4 },
          { id: 5 },
          { id: 6 },
        ],
      },
    },
  });

  await prisma.producto.create({
    //Instancia de Producto 3 CATEGORIA 7
    data: {
      nombre: "Batido de Chicle",
      descripcion: "Batido a base de yogurt sabor a chicle.",
      ingredientes: "Yogurt, azúcar, hielo, escencia de chicle.",
      precio: "1700",
      idCategoria: 7,
      imagen: "./assets/images/cloud-yogurt.jpg",
      restaurantes: {
        connect: [
          { id: 1 },
          { id: 2 },
          { id: 3 },
          { id: 4 },
          { id: 5 },
          { id: 6 },
        ],
      },
    },
  });

  await prisma.producto.create({
    //Instancia de Producto 1 CATEGORIA 8
    data: {
      nombre: "Chips de Chocolate",
      descripcion: "Pequeños trozos de chocolate.",
      ingredientes: "Chocolate con leche.",
      precio: "300",
      idCategoria: 8,
      imagen: "./assets/images/chips-chocolate.jpeg",
      restaurantes: {
        connect: [
          { id: 1 },
          { id: 2 },
          { id: 3 },
          { id: 4 },
          { id: 5 },
          { id: 6 },
        ],
      },
    },
  });

  await prisma.producto.create({
    //Instancia de Producto 2 CATEGORIA 8
    data: {
      nombre: "Galleta Oreo",
      descripcion: "Galleta Oreo en polvo.",
      ingredientes: "Galleta Oreo.",
      precio: "300",
      idCategoria: 8,
      imagen: "./assets/images/galleta-oreo.jpg",
      restaurantes: {
        connect: [
          { id: 1 },
          { id: 2 },
          { id: 3 },
          { id: 4 },
          { id: 5 },
          { id: 6 },
        ],
      },
    },
  });

  await prisma.producto.create({
    //Instancia de Producto 3 CATEGORIA 8
    data: {
      nombre: "Leche Condensada",
      descripcion: "Leche Condensada.",
      ingredientes: "Leche Condensada.",
      precio: "300",
      idCategoria: 8,
      imagen: "./assets/images/condensed-milk.jpg",
      restaurantes: {
        connect: [
          { id: 1 },
          { id: 2 },
          { id: 3 },
          { id: 4 },
          { id: 5 },
          { id: 6 },
        ],
      },
    },
  });

  //pedidos
  await prisma.pedido.create({
    //Instancia de pedido 1
    data: {
      idUsuario: 1,
      estado: EstadoPedido.Registrada,
      tipoPedido: TipoPedido.En_linea,
      idMesa: 1,
      fechaPedido: new Date("01/11/2022"),
      subtotal: "1700.00",
      descuento: "0.10",
      impuesto: "0.13",
      total: "1728.9",
    },
  });

  await prisma.pedido.create({
    //Instancia de pedido 2
    data: {
      idUsuario: 2,
      estado: EstadoPedido.Pendiente,
      tipoPedido: TipoPedido.En_Restaurante,
      idMesa: 2,
      fechaPedido: new Date("02/11/2022"),
      subtotal: "2550.00",
      descuento: "0.10",
      impuesto: "0.13",
      total: "2593.35",
    },
  });

  await prisma.pedido.create({
    //Instancia de pedido 3
    data: {
      idUsuario: 3,
      estado: EstadoPedido.Entregada,
      tipoPedido: TipoPedido.En_Restaurante,
      idMesa: 3,
      fechaPedido: new Date("03/11/2022"),
      subtotal: "1700.00",
      descuento: "0.10",
      impuesto: "0.13",
      total: "1728.9",
    },
  });

  await prisma.pedido.create({
    //Instancia de pedido 4
    data: {
      idUsuario: 4,
      estado: EstadoPedido.Por_Pagar,
      tipoPedido: TipoPedido.En_linea,
      idMesa: 4,
      fechaPedido: new Date("04/11/2022"),
      subtotal: "3600.00",
      descuento: "0.10",
      impuesto: "0.13",
      total: "3661.2",
    },
  });

  //detalle pedidos
  await prisma.detallePedido.create({
    //Instancia de detalle pedido 1
    data: {
      idProducto: 1,
      idPedido: 1,
      cantidad: 2,
      notas: "Con cuchara",
    },
  });

  await prisma.detallePedido.create({
    //Instancia de detalle pedido 2
    data: {
      idProducto: 2,
      idPedido: 2,
      cantidad: 3,
      notas: "Sin cuchara",
    },
  });

  await prisma.detallePedido.create({
    //Instancia de detalle pedido 3
    data: {
      idProducto: 3,
      idPedido: 3,
      cantidad: 2,
      notas: "Con cuchara",
    },
  });

  await prisma.detallePedido.create({
    //Instancia de detalle pedido 4
    data: {
      idProducto: 4,
      idPedido: 4,
      cantidad: 3,
      notas: "Sin cuchara",
    },
  });

  //pago
  await prisma.pago.create({
    //Instancia de pago 1
    data: {
      idPedido: 1,
      tipoPago: TipoPago.Efectivo,
      totalPago: 3000,
    },
  });

  await prisma.pago.create({
    //Instancia de pago 2
    data: {
      idPedido: 2,
      tipoPago: TipoPago.Tarjeta,
      totalPago: 3100,
    },
  });

  await prisma.pago.create({
    //Instancia de pago 3
    data: {
      idPedido: 3,
      tipoPago: TipoPago.Efectivo,
      totalPago: 3200,
    },
  });

  await prisma.pago.create({
    //Instancia de pago 4
    data: {
      idPedido: 4,
      tipoPago: TipoPago.Tarjeta,
      totalPago: 3300,
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

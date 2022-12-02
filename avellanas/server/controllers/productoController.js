const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

//Obtener listado
module.exports.get = async (request, response, next) => {
  const productos = await prisma.producto.findMany({
    include: {
      restaurantes: true,
      categoria:{
        select:{
          categoria:true,
        },
      },
    },
  });
  response.json(productos);
};

//Obtener por Id
module.exports.getById = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const producto = await prisma.producto.findUnique({
    where: {
      id: id,
    },
    include: {
      restaurantes: true,
      categoria:{
        select:{
          categoria:true,
        },
      },
    },
  });
  response.json(producto);
};

//Crear Producto
module.exports.createProducto = async (infoProducto, response, next) => {
  let producto = infoProducto.body;
  const newProducto = await prisma.producto.create({
    data: {
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      ingredientes: producto.ingredientes,
      precio: producto.precio,
      idCategoria: producto.idCategoria,
      imagen: "./assets/images/helado-rainbow.jpg",
      restaurantes: {
        connect: producto.restaurantes,
      },
    },
  });
  response.json(newProducto);
};

//Actualizar Producto
module.exports.updateProducto = async (infoProducto, response, next) => {
  let producto = infoProducto.body;
  let idProducto = parseInt(infoProducto.params.id);

  //Obtener producto viego (anterior)
  const productoViejo = await prisma.producto.findUnique({
    where: { id: idProducto },
    include: {
      restaurantes: {
        select:{
          id:true
        }
      }
    }
  });

  const newProducto = await prisma.producto.update({
    where: {
      id: idProducto,
    },
    data: {
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      ingredientes: producto.ingredientes,
      precio: producto.precio,
      idCategoria: producto.idCategoria,
      imagen: producto.imagen,
      restaurantes: {
        //Restaurantes tiene que ser {id:valor}
        disconnect:productoViejo.restaurantes,
        connect: producto.restaurantes,
      },
    },
  });
  response.json(newProducto);
};

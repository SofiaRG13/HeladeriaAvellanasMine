const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { Rol } = require("@prisma/client");
const jwt = require("jsonwebtoken");
//--npm install bcrypt
const bcrypt = require("bcrypt");

//Obtener listado
module.exports.get = async (request, response, next) => {
  const usuarios = await prisma.usuario.findMany({});
  response.json(usuarios);
};

//Obtener por Id
module.exports.getById = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const usuario = await prisma.usuario.findUnique({
    where: {
      id: id,
    },
    include: {
      pedidos: true,
    },
  });
  response.json(usuario);
};

//Obtener listado por Mesero
module.exports.getMesero=async(request,response,next)=>{
  const usuarios=await prisma.usuario.findMany({
    where:{rol:'Mesero'}
  });
  response.json(usuarios);
};

//Crear nuevo usuario
module.exports.register = async (request, response, next) => {
  const userData = request.body;
  if (userData.idRestaurante == 0) {
    userData.idRestaurante = null;
  }
  //Salt es una cadena aleatoria.
  //"salt round" factor de costo controla cuánto tiempo se necesita para calcular un solo hash de BCrypt
  // salt es un valor aleatorio y debe ser diferente para cada cálculo, por lo que el resultado casi nunca debe ser el mismo, incluso para contraseñas iguales
  let salt = bcrypt.genSaltSync(10);
  // Hash password
  let hash = bcrypt.hashSync(userData.contrasenna, salt);
  const user = await prisma.usuario.create({
    data: {
      nombre: userData.nombre,
      apellido1: userData.apellido1,
      apellido2: userData.apellido2,
      email: userData.email,
      contrasenna: hash,
      rol: Rol[userData.rol],
      idRestaurante: userData.idRestaurante,
    },
  });
  response.status(200).json({
    status: true,
    message: "Usuario creado",
    data: user,
  });
};

module.exports.login = async (request, response, next) => {
  let userReq = request.body;
  //Buscar el usuario según el email dado
  const user = await prisma.usuario.findUnique({
    where: {
      email: userReq.email,
    },
  });
  if (user) {
    //Verifica la contraseña
    const checkPassword = bcrypt.compareSync(
      userReq.contrasenna,
      user.contrasenna
    );
    if (checkPassword) {
      //Si el usuario es correcto: email y password
      //Crear el token
      const payload = {
        email: user.email,
        rol: user.rol,
      };
      //Crea el token con el payload, llave secreta
      // y el tiempo de expiración
      const token = jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE,
      });
      response.json({
        success: true,
        message: "Usuario registrado",
        data: {
          user,
          token,
        },
      });
    } else {
      response.status(401).send({
        success: false,
        message: "Contraseña incorrecta",
      });
    }
    //Sino lo encuentra según su email
  } else {
    response.status(401).send({
      success: false,
      message: "Usuario no registrado",
    });
  }
};

//Actualizar Usuario
module.exports.updateUsuario = async (infoUsuario, response, next) => {
  let usuario = infoUsuario.body;
  let idUsuario = parseInt(infoUsuario.params.id);

  //Obtener usuario viego (anterior)
  const usuarioViejo = await prisma.usuario.findUnique({
    where: { id: idUsuario },
  });

  if (usuario.idRestaurante == 0) {
    usuario.idRestaurante = null;
  }

  const newUsuario = await prisma.usuario.update({
    where: {
      id: idUsuario,
    },
    data: {
      nombre: usuario.nombre,
      apellido1: usuario.apellido1,
      apellido2: usuario.apellido2,
      email: usuario.email,
      contrasenna: usuario.contrasenna,
      rol: usuario.rol,
      idRestaurante: usuario.idRestaurante,
    },
  });
  response.json(newUsuario);
};

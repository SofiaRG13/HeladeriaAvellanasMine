const express=require("express");
const router=express.Router();

//Controlador con las acciones de las rutas
const productoController=require("../controllers/productoController");
const auth=require("../middleware/auth");
//Rutas de productos

//RECORDAR QUE LAS QUE TIENE PARAMETROS VAN DE ÚLTIMO.
router.get("/",productoController.get);

router.post("/",auth.grantRole(["Administrador"]),productoController.createProducto);

router.get("/:id",productoController.getById);

router.put("/:id",auth.grantRole(["Administrador"]),productoController.updateProducto);


module.exports=router;
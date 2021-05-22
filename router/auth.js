/*
  path: /api/login
*/

const { Router } = require("express");
const { crearUsuario, login, renewToken } = require("../controllers/auth");
// Router _> nos va a permitir definir las rutas especificas para los endpoints

const router = Router();

//peticion post -> Crear nuevos usuarios
router.post("/new", crearUsuario);

//Login
router.post("/", login);

//Revalidar Token
router.get("/renew", renewToken);

module.exports = router;

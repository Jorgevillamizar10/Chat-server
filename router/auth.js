/*
  path: /api/login
*/

const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();
// Router _> nos va a permitir definir las rutas especificas para los endpoints
const { validarCampos } = require("../middlewares/validar-campos");

//Controladores
const { crearUsuario, login, renewToken } = require("../controllers/auth");

//peticion post -> Crear nuevos usuarios
router.post(
	"/new",
	[
		check("nombre", "el nombre es obligatorio").not().isEmpty(),
		check("password", "el password es obligatorio").not().isEmpty(),
		check("email", "el email es obligatorio").isEmail(),
		validarCampos,
	],
	crearUsuario
);

//Login
//check -> es un middelware que nos sirve para hacer una validacion automatica, el primer argumento es el campo que yo necesito que venga ahi
//si no se envia el error que aparece es el segundo campo que se envia
//luego del punto "." vienen las condiciones
router.post(
	"/",
	[
		check("email", "el email es obligatorio").isEmail(),
		check("password", "el password es obligatorio").not().isEmpty(), //not().isEmpty() que no este vacio
		validarCampos, // express automaticamente le va a mandar un par de argumentos a esta funcion que creamos
	],
	login
);
// si mando tres argumentos, el segundo argumento es conocido como middelware propios de esta ruta, que ejecute algo ahi antes de disparar el controlador (login)
// se pone [ ] para definir varios, si es solo uno se coloca sin las [ ]

//Revalidar Token
router.get("/renew", renewToken);

module.exports = router;

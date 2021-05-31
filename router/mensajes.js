/*
  Path: api/mensajes
*/

const { Router } = require("express");
const { obtenerChat } = require("../controllers/mensajes");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

//crando nuestro endpoint tipo GET
//argumento :de , middleware, controlador
router.get("/:de", validarJWT, obtenerChat);

module.exports = router;

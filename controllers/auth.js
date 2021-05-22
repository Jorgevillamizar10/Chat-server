const { response } = require("express");

//para tener el tipado usamos response

const crearUsuario = async (req, res = response) => {
	res.json({
		ok: true,
		msg: "new",
	});
};

const login = async (req, res = response) => {
	res.json({
		ok: true,
		msg: "login",
	});
};

const renewToken = async (req, res = response) => {
	res.json({
		ok: true, // no es obligatorio ponerlo pero es bueno, si se hizo todo correctamente es true, tambien sirve para mandar mensajes de error
		msg: "renew",
	});
};

module.exports = {
	crearUsuario,
	login,
	renewToken,
};

const { response } = require("express");
const Usuario = require("../models/usuario");

//para tener el tipado usamos response

const crearUsuario = async (req, res = response) => {
	try {
		//creando el usuario en la base de datos
		const { email, password } = req.body;

		//verificar que el email no exista
		const existeEmail = await Usuario.findOne({ email: email });
		if (existeEmail) {
			return res.status(400).json({
				ok: false,
				msg: "El correo ya existe",
			});
		}

		// TODO: encriptar contraseña

		// Guardar usuario en BD
		const usuario = new Usuario(req.body);
		await usuario.save();

		res.json({
			usuario,
		});
	} catch (error) {
		console.log(error);
		//500 -> interval server error
		res.status(500).json({
			ok: false,
			msg: "Hable con el administrador",
		});
	}
};

const login = async (req, res = response) => {
	const { email, password } = req.body; // manera 2

	res.json({
		ok: true,
		msg: "login",
		email,
		password,
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

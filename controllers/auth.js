const { response } = require("express");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/jwt");

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

		const usuario = new Usuario(req.body);

		// encriptar contraseña
		const salt = bcrypt.genSaltSync(); //salt ->  cantidad de vueltas que podemos ejecutar para encriptar nuestra contraseña de manera mas segura, se recomiendan 10
		usuario.password = bcrypt.hashSync(password, salt);

		// Guardar usuario en BD
		await usuario.save();

		// Generar el JWT
		const token = await generarJWT(usuario.id);

		res.json({
			ok: true,
			usuario,
			token,
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

	try {
		//Verificar si existe el correo en la base de datos
		const usuarioDB = await Usuario.findOne({ email }); // retorna true o false
		if (!usuarioDB) {
			// si no existe el usuario
			return res.status(404).json({
				ok: false,
				msg: "Email no encontrado",
			});
		}

		//validar el password en la base de datos
		//compareSync -> funcion de bcrypt para comparar el match de las password enviadas, retorna true o false
		const validPassword = bcrypt.compareSync(password, usuarioDB.password);
		if (!validPassword) {
			// si las contraseñas no son iguales
			return res.status(400).json({
				ok: false,
				msg: "Password no es correcto", // no es conviente darle una pista a la pérsona de que fue lo que fallo pero lo dejamos asi por fines educativos
			});
		}

		// en este punto ya paso true el email y true las contraseñas entonces procedemos generar el token
		//Generar el JWT
		const token = await generarJWT(usuarioDB.id);

		res.json({
			ok: true,
			usuario: usuarioDB,
			token,
		});
	} catch (error) {
		//500 -> interval server error
		res.status(500).json({
			ok: false,
			msg: "Hable con el administrador",
		});
	}
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

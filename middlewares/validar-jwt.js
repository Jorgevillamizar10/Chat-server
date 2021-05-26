const jwt = require("jsonwebtoken");

const validarJWT = (req, res, next) => {
	try {
		const token = req.header("x-token"); //extraemos el token de la request "x-token" el nombre que le puse en postman al header

		if (!token) {
			return res.status(401).json({
				ok: false,
				msg: "No hay token en la peticion",
			});
		}

		//verificando el token
		const { uid } = jwt.verify(token, process.env.JWT_KEY);
		req.uid = uid;

		next();
	} catch (e) {
		// code 401 -> no autorizado
		return res.status(401).json({
			ok: false,
			msg: "Token no es valido",
		});
	}
};

module.exports = {
	validarJWT,
};

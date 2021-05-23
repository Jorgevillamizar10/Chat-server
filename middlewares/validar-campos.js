const { validationResult } = require("express-validator");

//el next es una funcion que hay que llamar para decirle ok todo salio bien continua con el siguiente middleware
const validarCampos = (req, res, next) => {
	//leyendo lo que nos mandan en el body
	//const body = req.body; // manera 1

	const errores = validationResult(req);

	//si los errores no estan vacios
	if (!errores.isEmpty()) {
		//status 400 -> bad request
		return res.status(400).json({
			ok: false,
			errors: errores.mapped(), // mapped es una funcion propia del validationResult
		});
	}

	next();
};

module.exports = {
	validarCampos,
};

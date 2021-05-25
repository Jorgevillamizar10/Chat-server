const jwt = require("jsonwebtoken");

const generarJWT = (uid) => {
	//dentro de la promesa colocamos el callback que queremos ejecutar
	return new Promise((resolve, reject) => {
		//payload que voy a insertar en el JWT
		const payload = {
			uid, //aqui colocamos la info que queramos
		};

		//generamos el JWT
		jwt.sign(
			payload,
			process.env.JWT_KEY, //secretOrPrivateKey -> algo una palabra que tiene que ser secreta (protegida) la creamos en las .env
			{
				expiresIn: "24h", //cuanto tiempo quiero que expire el token
			},
			//otro callback
			(err, token) => {
				if (err) {
					console.log(err);
					reject("No se pudo generar el JWT");
				} else {
					resolve(token);
				}
			}
		);
	});
	//al retornar una promesa ya usamos el async y el await
};

module.exports = {
	generarJWT,
};

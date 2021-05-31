const Mensaje = require("../models/mensaje"); //modelo de mensaje

const obtenerChat = async (req, res) => {
	const miId = req.uid;
	const mensajesDe = req.params.de; // obtenemos el parametro que enviamos por la url del endpoint

	//condicion para obtener todos los mensajes de ese usuario en la base de datos
	const last30 = await Mensaje.find({
		// condicion ó, or -> ||
		$or: [
			{ de: miId, para: mensajesDe },
			{ de: mensajesDe, para: miId },
		],
	})
		.sort({ createdAt: "desc" }) // registros ordenados de manera descendente para eso usamos el sort
		.limit(30); // solo queremos maximo 30

	res.json({
		ok: true,
		mensajes: last30,
	});
};

module.exports = {
	obtenerChat,
};

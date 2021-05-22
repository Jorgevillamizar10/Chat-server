const { Schema, model } = require("mongoose");

const MensajeSchema = Schema(
	{
		//de ->  la persona que manda el mensaje
		// Schema.Types.ObjectId -> significa que es una referencia y va a ser una referencia a la coleccion de usuario
		de: {
			type: Schema.Types.ObjectId,
			ref: "Usuario",
			required: true,
		},
		//para -> para quien va el mensaje
		para: {
			type: Schema.Types.ObjectId,
			ref: "Usuario",
			required: true,
		},
		mensaje: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true, // adiciona la fecha de creacion y la fecha de ultima modificacion
	}
);

MensajeSchema.method("toJSON", function () {
	const { __v, ...object } = this.toObject();
	return object;
});

module.exports = model("Mensaje", MensajeSchema);

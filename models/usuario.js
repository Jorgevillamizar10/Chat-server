const { Schema, model } = require("mongoose");

//Schema -> nos sirve para que podamos ver que campos son los que quiero almacenar aqui
const UsuarioSchema = Schema({
	//usuario va a tener su nombre sera de tipo string y es obligatorio
	nombre: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true, //para que sea UNICO
	},
	password: {
		type: String,
		required: true,
	},
	online: {
		type: Boolean,
		default: false, //para que por defecto siempre tenga un valor
	},
});

UsuarioSchema.method("toJSON", function () {
	// __v -> version , _id -> id de la base de datos, esto lo genera mongoose
	const { __v, _id, password, ...object } = this.toObject();
	//uid -> user identifier
	object.uid = _id;
	return object;
});

module.exports = model("Usuario", UsuarioSchema);

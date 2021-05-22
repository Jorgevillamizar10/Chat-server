const mongoose = require("mongoose");

const dbConnection = async () => {
	try {
		await mongoose.connect(process.env.DB_CONNECT_STRING, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		});
		console.log("entro");
	} catch (error) {
		console.log("No entro");
		console.log(error);
		throw new Error("Error en la base de datos - vea logs");
	}
};

module.exports = {
	dbConnection,
};

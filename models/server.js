// Servidor de Express
const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const path = require("path");
const { dbConnection } = require("../database/config");

const Sockets = require("./sockets");

class Server {
	constructor() {
		this.app = express();
		this.port = process.env.PORT;

		// Conectar a DB
		dbConnection();

		// Http server
		this.server = http.createServer(this.app);

		// Configuraciones de sockets
		this.io = socketio(this.server, {
			/* configuraciones */
		});
	}

	middlewares() {
		// Desplegar el directorio público
		this.app.use(express.static(path.resolve(__dirname, "../public")));

		// TODO: CORS

		// API: ENDPOINTS
		this.app.use("/api/login", require("../router/auth"));
		// cuando alguien acceda a /api/login -> va a importar lo que exporta el path ../router/auth
	}

	// Esta configuración se puede tener aquí o como propieda de clase
	// depende mucho de lo que necesites
	configurarSockets() {
		new Sockets(this.io);
	}

	execute() {
		// Inicializar Middlewares
		this.middlewares();

		// Inicializar sockets
		this.configurarSockets();

		// Inicializar Server
		this.server.listen(this.port, () => {
			console.log("Server corriendo en puerto:", this.port);
		});
	}
}

module.exports = Server;

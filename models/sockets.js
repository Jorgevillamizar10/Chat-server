class Sockets {
	constructor(io) {
		this.io = io;

		this.socketEvents();
	}

	socketEvents() {
		// On connection
		this.io.on("connection", (socket) => {
			// TODO: Validar el JWT
			// Si el token no es valido, desconectar
			// TODO: Saber que usuario esta activo mediante el uId
			// TODO: Emitir todos los usuarios conectados
			// TODO: Socket join
			// TODO: Escuchar cuando el cliente manda un mensaje
			//mensaje-personal
			// TODO: Disconnect
			//macar en la BD que el usuario se desconecto
		});
	}
}

module.exports = Sockets;

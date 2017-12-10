require('dotenv').config();

const async = require('async');

var webSocketServerMiddlewareStack = [
	(socket, next) => {
		socket.on(
			'data',
			console.log
		);
	}
];

module.exports.createServer = class Server {
	constructor (httpServer, logWatch, callback) {
		this.webSocketServerMiddlewareStack = webSocketServerMiddlewareStack;
		this.webSocketServer = require('socket.io')(httpServer);
		this.sockets = [];

		this.webSocketServer.on(
			'connection',
			(socket) => {
				this.sockets.push(socket);

				async
					.eachSeries(
						this.webSocketServerMiddlewareStack,
						(middleware, callback) => {
							middleware(socket, callback);
						},
						() => {
							console.log('done');	
						}
					);
			}
		);
		callback();
	}
};
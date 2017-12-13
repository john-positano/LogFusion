require('dotenv').config();

const async = require('async');

var webSocketServerMiddlewareStack = [
	(socket, $rootScope, next) => {
		socket.on(
			'GET/logs/list',
			() => {
				socket.emit('POST/logs/list', process.logWatch._directoryListingArray);
				return;
			}
		);
		next();
	}
];

module.exports.createServer = class Server {
	constructor (httpServer, $rootScope, callback) {
		this.webSocketServerMiddlewareStack = webSocketServerMiddlewareStack;
		this.webSocketServer = require('socket.io')(httpServer);
		this.sockets = [];
		this.$rootScope = $rootScope; 

		this.webSocketServer.on(
			'connection',
			(socket) => {
				this.sockets.push(socket);

				async
					.eachSeries(
						this.webSocketServerMiddlewareStack,
						(middleware, callback) => {
							middleware(socket, $rootScope, callback);
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
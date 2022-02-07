'use strict';

const config = require('./config');
const Server = require('./lib/server');

function exceptionHandler(name, error) {
	console.log(name, error);
	process.exit(1);
}

process.on(
	'uncaughtException',
	exceptionHandler.bind(null, 'uncaughtException')
);
process.on(
	'unhandledRejection',
	exceptionHandler.bind(null, 'unhandledRejection')
);

const server = new Server(config);

server.start();

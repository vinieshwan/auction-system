'use strict';

class LogoutRoute {
	constructor(app, context) {
		this.app = app;
		this.config = context.config;
		this.controllers = context.controllers;
		this.middlewares = context.middlewares;
		this.logger = context.logger;
	}

	setupRoute() {
		this.app.post(
			'/v1/logout',
			this.middlewares.expireSession,
			this.sendResponse.bind(this)
		);
	}

	async sendResponse(req, res, next) {
		res.status(200).send({
			ok: true
		});
	}
}

module.exports = LogoutRoute;

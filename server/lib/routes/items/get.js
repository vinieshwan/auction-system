'use strict';

class GetItemRoute {
	constructor(app, context) {
		this.app = app;
		this.config = context.config;
		this.controllers = context.controllers;
		this.middlewares = context.middlewares;
		this.logger = context.logger;
	}

	setupRoute() {
		this.app.get(
			'/v1/item/:handler',
			this.middlewares.verifySession,
			this.middlewares.loadSession,
			this.getItem.bind(this)
		);
	}

	async getItem(req, res, next) {
		if (!req.session) {
			this.logger.error({
				label: 'GetItemRoute',
				message: 'getItem',
				data: 'no session'
			});

			return res.status(401).json({ message: 'Unauthorized Access' });
		}

		let item;

		try {
			item = await this.controllers.items.get(req.params.handler);
		} catch (error) {
			this.logger.error({
				label: 'GetItemRoute',
				message: 'getItem',
				data: { error }
			});

			return res.status(500).json({ message: error.message });
		}

		res.status(200).json({
			ok: true,
			data: item
		});
	}
}

module.exports = GetItemRoute;

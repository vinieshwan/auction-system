'use strict';

class ItemsListRoute {
	constructor(app, context) {
		this.app = app;
		this.config = context.config;
		this.controllers = context.controllers;
		this.middlewares = context.middlewares;
		this.logger = context.logger;
	}

	setupRoute() {
		this.app.get(
			'/v1/items/list/:status',
			this.middlewares.verifySession,
			this.middlewares.loadSession,
			this.getList.bind(this)
		);
	}

	async getList(req, res, next) {
		if (!req.session) {
			this.logger.error({
				label: 'ItemsListRoute',
				message: 'getList',
				data: 'no session'
			});
			return res.status(401).json({ message: 'Unauthorized Access' });
		}

		let list;

		try {
			list = await this.controllers.items.getList(req.params.status);
		} catch (error) {
			this.logger.error({
				label: 'ItemsListRoute',
				message: 'getList',
				data: { error }
			});

			return res.status(500).json({ message: error.message });
		}

		res.status(200).json({
			ok: true,
			data: list
		});
	}
}

module.exports = ItemsListRoute;

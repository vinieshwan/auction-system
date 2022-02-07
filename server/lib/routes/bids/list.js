'use strict';

class ListBidRoute {
	constructor(app, context) {
		this.app = app;
		this.config = context.config;
		this.controllers = context.controllers;
		this.middlewares = context.middlewares;
		this.logger = context.logger;
	}

	setupRoute() {
		this.app.get(
			'/v1/bid/list',
			this.middlewares.verifySession,
			this.middlewares.loadSession,
			this.listBid.bind(this)
		);
	}

	async listBid(req, res, next) {
		if (!req.session) {
			this.logger.error({
				label: 'ListBidRoute',
				message: 'listBid',
				data: 'no session'
			});

			return res.status(401).json({ message: 'Unauthorized Access' });
		}

		let bids;

		try {
			bids = await this.controllers.bids.listByUser(req.session.userId);
		} catch (error) {
			this.logger.error({
				label: 'ListBidRoute',
				message: 'listBid',
				data: { error }
			});

			return res.status(500).json({ message: error.message });
		}

		res.status(200).json({
			ok: true,
			data: bids
		});
	}
}

module.exports = ListBidRoute;

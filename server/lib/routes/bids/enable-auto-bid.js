'use strict';

class AutoBidRoute {
	constructor(app, context) {
		this.app = app;
		this.config = context.config;
		this.controllers = context.controllers;
		this.middlewares = context.middlewares;
		this.logger = context.logger;
	}

	setupRoute() {
		this.app.post(
			'/v1/bid/enable-auto-bid',
			this.middlewares.verifySession,
			this.middlewares.loadSession,
			this.enableAutoBid.bind(this)
		);
	}

	async enableAutoBid(req, res, next) {
		if (!req.session) {
			this.logger.error({
				label: 'AutoBidRoute',
				message: 'enableAutoBid',
				data: 'no session'
			});

			return res.status(401).json({ message: 'Unauthorized Access' });
		}

		let isPosted, isUpdated;

		try {
			isPosted = await this.controllers.bids.post(
				req.body.itemId,
				req.session.userId,
				req.body.fields
			);

			if (isPosted) {
				isUpdated = await this.controllers.items.update(
					req.body.itemId,
					req.session.userId,
					req.body.fields
				);
			}

			if (isPosted && !isUpdated) {
				await this.controllers.bids.post(
					req.body.itemId,
					req.session.userId,
					req.body.fields
				);
			}
		} catch (error) {
			this.logger.error({
				label: 'AutoBidRoute',
				message: 'enableAutoBid',
				data: { error }
			});

			return res.status(500).json({ message: error.message });
		}

		res.status(200).json({
			ok: true
		});
	}
}

module.exports = AutoBidRoute;

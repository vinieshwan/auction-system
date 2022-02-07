'use strict';

class PostBidRoute {
	constructor(app, context) {
		this.app = app;
		this.config = context.config;
		this.controllers = context.controllers;
		this.middlewares = context.middlewares;
		this.logger = context.logger;
	}

	setupRoute() {
		this.app.post(
			'/v1/bid/post',
			this.middlewares.verifySession,
			this.middlewares.loadSession,
			this.postBid.bind(this)
		);
	}

	async postBid(req, res, next) {
		if (!req.isAdmin && !req.session) {
			this.logger.error({
				label: 'PostBidRoute',
				message: 'postBid',
				data: 'no session'
			});

			return res.status(401).json({ message: 'Unauthorized Access' });
		}

		const userId = req.body.userId ? req.body.userId : req.session.userId;

		let isUpdated = false;

		try {
			const isPosted = await this.controllers.bids.post(
				req.body.itemId,
				userId,
				req.body.fields
			);

			if (isPosted) {
				isUpdated = await this.controllers.items.update(
					req.body.itemId,
					userId
				);
			}

			if (isPosted && !isUpdated) {
				await this.controllers.bids.post(
					userId,
					req.body.itemId,
					req.body.fields,
					{
						operation: 'deduct',
						retry: true
					}
				);
			}
		} catch (error) {
			this.logger.error({
				label: 'PostBidRoute',
				message: 'postBid',
				data: { error }
			});

			return res.status(500).json({ message: error.message });
		}

		res.status(200).json({
			ok: true
		});
	}
}

module.exports = PostBidRoute;

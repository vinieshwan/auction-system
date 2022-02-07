'use strict';

class BidsController {
	constructor(options) {
		this.config = options.config;
		this.utils = options.utils;
		this.models = options.models.bids;
	}

	async post(itemId, userId, fields, options = {}) {
		let bid;

		try {
			bid = await this.models.post(itemId, userId, fields, options);
		} catch (error) {
			if (options.retry) {
				await this.utils.date.timeOut(2000);
				return this.post(itemId, userId, fields, options);
			}

			return false;
		}

		if (!bid) {
			if (options.retry) {
				await this.utils.date.timeOut(2000);
				return this.post(itemId, userId, fields, options);
			}

			return false;
		}

		return true;
	}

	async listByUser(userId) {
		let list;

		try {
			list = await this.models.listByUser(userId, {
				readFromSecondary: true
			});
		} catch (error) {
			throw new Error('Internal Server Error');
		}

		if (!list) {
			throw new Error('Internal Server Error');
		}

		return list;
	}
}

module.exports = BidsController;

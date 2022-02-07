'use strict';

class ItemsController {
	constructor(options) {
		this.config = options.config;
		this.models = options.models.items;
	}

	async get(handler) {
		let item;

		try {
			item = await this.models.getByHandler(handler, {
				readFromSecondary: true
			});
		} catch (error) {
			throw new Error('Internal Server Error');
		}

		if (!item) {
			throw new Error('Internal Server Error');
		}

		return item;
	}

	async update(itemId, userId) {
		let item;

		try {
			item = await this.models.update(itemId, userId);
		} catch (error) {
			return false;
		}

		if (!item) {
			return false;
		}

		return true;
	}

	async getList(status) {
		let list;

		try {
			list = await this.models.getByStatus(status, {
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

module.exports = ItemsController;

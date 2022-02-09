'use strict';

class ItemsController {
	constructor(options) {
		this.config = options.config;
		this.models = options.models.items;
	}

	async get(handler, field) {
		let item;

		const options = {
			readFromSecondary: true
		};

		if (field) {
			options.projection = {
				[field]: 1
			};
		}

		try {
			item = await this.models.getByHandler(handler, options);
		} catch (error) {
			console.log(error);
			throw new Error('Internal Server Error');
		}

		if (!item) {
			throw new Error('Internal Server Error');
		}

		return item;
	}

	async update(itemId, userId, fields, options = {}) {
		let item;

		try {
			item = await this.models.update(itemId, userId, fields, options);
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

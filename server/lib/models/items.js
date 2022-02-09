'use strict';

const { ObjectId, ReadPreference } = require('mongodb');

class ItemsModel {
	constructor(client, options) {
		const { database } = options;

		const db = client.db(database);
		this.collection = db.collection(ItemsModel.getCollectionName());
	}

	static getCollectionName() {
		return 'items';
	}

	async update(itemId, userId, fields, options = {}) {
		const queryOptions = {
			$set: { updatedAt: new Date() }
		};

		if (fields.isAutoBid) {
			queryOptions.$addToSet = {
				users: userId
			};
		} else {
			queryOptions.$pull = {
				users: userId
			};
		}

		if (options.operation === 'add') {
			queryOptions.$inc = {
				runningPrice: 1
			};
		} else if (options.operation === 'deduct') {
			queryOptions.$inc = {
				runningPrice: -1
			};
		}

		return this.collection.findOneAndUpdate(
			{ _id: new ObjectId(itemId) },
			queryOptions
		);
	}

	async getByHandler(handler, options = {}) {
		const queryOptions = {};

		if (options.projection !== undefined) {
			queryOptions.projection = options.projection;
		} else {
			queryOptions.projection = {
				users: 0
			};
		}

		if (options.readFromSecondary === true) {
			queryOptions.readPreference = ReadPreference.SECONDARY;
		}

		console.log(queryOptions);

		return this.collection.findOne(
			{
				handler
			},
			queryOptions
		);
	}

	async getByStatus(status, options = {}) {
		const queryOptions = {
			projection: {
				users: 0
			}
		};

		if (options.projection !== undefined) {
			queryOptions.projection = {
				...queryOptions.projection,
				...options.projection
			};
		}

		if (options.readFromSecondary === true) {
			queryOptions.readPreference = ReadPreference.SECONDARY;
		}

		return this.collection
			.find(
				{
					status
				},
				queryOptions
			)
			.toArray();
	}
}

module.exports = ItemsModel;

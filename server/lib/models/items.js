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

	async update(itemId, userId) {
		return this.collection.findOneAndUpdate(
			{ _id: new ObjectId(itemId) },
			{
				$addToSet: { users: userId },
				$set: { updatedAt: new Date() },
				$inc: { runningPrice: 1 }
			}
		);
	}

	async getByHandler(handler, options = {}) {
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

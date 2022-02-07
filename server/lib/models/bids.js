'use strict';

const { ObjectId, ReadPreference } = require('mongodb');

class BidsModel {
	constructor(client, options) {
		const { database } = options;

		const db = client.db(database);
		this.collection = db.collection(BidsModel.getCollectionName());
	}

	static getCollectionName() {
		return 'bids';
	}

	async post(itemId, userId, fields, options = {}) {
		const query = {
			$setOnInsert: {
				itemId: new ObjectId(itemId),
				userId: new ObjectId(userId),
				createdAt: new Date(),
				autoBidRunningPrice: 0
			},
			$set: {
				updatedAt: new Date()
			}
		};

		if (fields.isAutoBid !== undefined) {
			query.$set.isAutoBid = fields.isAutoBid;
		}

		if (options.operation === 'add') {
			query.$inc = {
				autoBidRunningPrice: 1
			};
		} else if (options.operation === 'deduct') {
			query.$inc = {
				autoBidRunningPrice: -1
			};
		}

		return this.collection.updateOne(
			{ itemId: new ObjectId(itemId), userId: new ObjectId(userId) },
			query,
			{ upsert: true }
		);
	}

	async listByUser(userId, options = {}) {
		const queryOptions = {};

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
					userId: new ObjectId(userId)
				},
				queryOptions
			)
			.toArray();
	}
}

module.exports = BidsModel;

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
		const queryOptions = {
			$setOnInsert: {
				itemId: new ObjectId(itemId),
				userId: new ObjectId(userId),
				createdAt: new Date()
			},
			$set: {
				updatedAt: new Date(),
				isAutoBid: fields.isAutoBid
			}
		};

		console.log(fields.isAutoBid, options.operation);

		if (!fields.isAutoBid && options.operation === 'add') {
			{
				queryOptions.$inc = {
					normalRunningPrice: 1
				};
			}
		} else if (fields.isAutoBid && options.operation === 'add') {
			queryOptions.$inc = {
				autoBidRunningPrice: 1
			};
		} else if (fields.isAutoBid && options.operation === 'deduct') {
			queryOptions.$inc = {
				autoBidRunningPrice: -1
			};
		}

		return this.collection.updateOne(
			{ itemId: new ObjectId(itemId), userId: new ObjectId(userId) },
			queryOptions,
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

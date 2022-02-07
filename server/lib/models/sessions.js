'use strict';

const { ObjectId, ReadPreference } = require('mongodb');

class SessionsModel {
	constructor(client, options) {
		const { database } = options;

		const db = client.db(database);
		this.collection = db.collection(SessionsModel.getCollectionName());
	}

	static getCollectionName() {
		return 'sessions';
	}

	static generateId() {
		return new ObjectId();
	}

	async add(userId, roleId) {
		return this.collection.insertOne({
			userId: new ObjectId(userId),
			roleId,
			createdAt: new Date(),
			expiredOn: new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
		});
	}

	async get(sessionId, roleId, options = {}) {
		const queryOptions = {};

		if (options.projection !== undefined) {
			queryOptions.projection = options.projection;
		}

		if (options.readFromSecondary === true) {
			queryOptions.readPreference = ReadPreference.SECONDARY;
		}

		return this.collection.findOne(
			{
				_id: new ObjectId(sessionId),
				roleId: new ObjectId(roleId),
				expiredOn: {
					$gt: new Date()
				}
			},
			queryOptions
		);
	}

	async expire(sessionId, roleId) {
		return this.collection.findOneAndUpdate(
			{
				_id: new ObjectId(sessionId),
				roleId: new ObjectId(roleId)
			},
			{
				$set: {
					expiredOn: new Date(new Date().getTime() - 24 * 60 * 60 * 1000)
				}
			}
		);
	}

	async forceExpire(field = {}) {
		const filter = {};

		if (field.name === 'sessionId') {
			filter._id = field.id;
		} else if (field.name === 'roleId') {
			filter.roleId = filter._id = field.id;
		}
		return this.collection.findOneAndUpdate(filter, {
			$set: {
				expiredOn: new Date(new Date().getTime() - 24 * 60 * 60 * 1000)
			}
		});
	}
}

module.exports = SessionsModel;

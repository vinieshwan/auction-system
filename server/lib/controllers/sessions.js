'use strict';

const SessionsModel = require('../models/sessions');

class SessionsController {
	constructor(options) {
		this.config = options.config;
		this.utils = options.utils;
		this.utils = options.utils;
		this.models = options.models.sessions;
	}

	async add(userId) {
		let session;
		const roleId = SessionsModel.generateId();

		try {
			session = await this.models.add(userId, roleId);
		} catch (error) {
			console.log(error);
			throw new Error('Internal Server Error');
		}

		if (!session || !session.acknowledged) {
			throw new Error('Internal Server Error');
		}

		return {
			sId: session.insertedId,
			rId: roleId
		};
	}

	async get(sessionId, roleId) {
		let session;

		try {
			session = await this.models.get(sessionId, roleId, {
				projection: {
					userId: 1
				},
				readFromSecondary: true
			});
		} catch (error) {
			throw new Error('Internal Server Error');
		}

		if (!session) {
			throw new Error('Unauthorized Access');
		}

		return session;
	}

	async expire(sessionId, roleId, options = {}) {
		try {
			await this.models.expire(sessionId, roleId);
		} catch (error) {
			if (options.retry) {
				await this.utils.date.timeOut(2000);
				return this.expire(sessionId, roleId, options);
			}

			return false;
		}

		return true;
	}

	async forceExpire(field, options = {}) {
		try {
			await this.models.forceExpire(field);
		} catch (error) {
			if (options.retry) {
				await this.utils.date.timeOut(2000);
				return this.forceExpire(field, options);
			}

			return false;
		}

		return true;
	}
}

module.exports = SessionsController;

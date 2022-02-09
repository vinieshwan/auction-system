'use strict';

const axios = require('axios');

class AutobidEvent {
	constructor(client, options) {
		this.client = client;
		this.database = options.database;
		this.config = options.config;
		this.logger = options.logger;
		this.document = [];
		this.previousItem = null;
	}

	async watch(ttl, collection) {
		const pipeline = [
			{
				$match: {
					$and: [
						{
							operationType: 'update',
							'updateDescription.updatedFields.users': { $exists: true }
						},
						{
							operationType: 'update',
							'updateDescription.updatedFields.runningPrice': { $exists: true }
						}
					]
				}
			}
		];

		const dbCollection = this.client.db(this.database).collection(collection);
		const changeStream = dbCollection.watch({
			pipeline,
			fullDocument: 'updateLookup'
		});

		changeStream.on('change', async (document) => {
			const { _id, users } = document.fullDocument;

			if (
				users &&
				(!this.previousItem || _id.toString() !== this.previousItem.toString())
			) {
				this.previousItem = _id;
				this.processEvents(_id, users);
			}
		});

		changeStream.on('error', async (error) => {
			console.log(`Error syncing the collection`, error);
			await this.closeChangeStream(ttl, changeStream);
		});

		await this.sleep(50000);
		this.previousItem = null;
	}

	sleep(ttl) {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve();
			}, ttl);
		});
	}

	closeChangeStream(ttl = 60000, changeStream) {
		return new Promise((resolve) => {
			setTimeout(() => {
				console.log('Closing the change stream');
				changeStream.close();
				resolve();
			}, ttl);
		});
	}

	processEvents(itemId, users = []) {
		const requests = [];
		const user = this.config.users.find((item) => {
			return item.role === 'admin';
		});

		const index = Math.floor(Math.random() * (users.length || 1 - 1 - 0) + 0);
		const maxItems = Math.floor(
			Math.random() * (users.length || 1 - index - 1) + 0
		);
		console.log(index, maxItems);
		for (let i = index; i <= maxItems; i++) {
			console.log(i, index, maxItems);
			console.log(`${this.config.appUrl}/v1/bid/post`, users[i]);
			requests.push(
				axios.post(
					`${this.config.appUrl}/v1/bid/post`,
					{
						itemId,
						userId: users[i],
						fields: {
							isAutoBid: true
						}
					},
					{
						withCredentials: true,
						headers: {
							'x-auth-admin': user.password
						}
					}
				)
			);
		}

		Promise.allSettled(requests);
	}
}

module.exports = AutobidEvent;

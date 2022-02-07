'use strict';

const axios = require('axios');

class AutobidEvent {
	constructor(client, options) {
		this.client = client;
		this.database = options.database;
		this.config = options.config;
		this.logger = options.logger;
	}

	async watch(ttl, collection, pipeline = []) {
		const dbCollection = this.client.db(this.database).collection(collection);
		const changeStream = dbCollection.watch({
			pipeline,
			fullDocument: 'updateLookup'
		});

		changeStream.on('change', (document) => {
			const item = document.fullDocument.users;

			const user = this.config.users.find((item) => {
				return item.role === 'admin';
			});

			const index = Math.floor(Math.random() * item.length);
			const maxItems = Math.floor(Math.random() * item.length) + 1;

			for (let i = index; i <= maxItems; i++) {
				try {
					axios.post(
						`${this.config.appUrl}/v1/bid/post`,
						{
							itemId: document.fullDocument._id,
							userId: item[1].toString(),
							fields: {
								operation: 'add'
							}
						},
						{
							withCredentials: true,
							headers: {
								'x-auth-admin': user.password
							}
						}
					);

					this.logger.info({
						label: 'AutobidEvent',
						message: 'watch'
					});
				} catch (error) {
					this.logger.error({
						label: 'AutobidEvent',
						message: 'watch',
						data: {
							error
						}
					});
				}
			}
		});

		await this.closeChangeStream(ttl, changeStream);
	}

	closeChangeStream(timeInMs = 60000, changeStream) {
		return new Promise((resolve) => {
			setTimeout(() => {
				console.log('Closing the change stream');
				changeStream.close();
				resolve();
			}, timeInMs);
		});
	}
}

module.exports = AutobidEvent;

'use strict';

require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

const path = require('path');

const {
	PORT,
	APP_URL,
	CLIENT_URL,
	NODE_ENV,

	DB_NAME,
	DB_USER,
	DB_PASSWORD,
	HOSTNAME_1,
	HOSTNAME_2,
	HOSTNAME_3,
	HOSTPORT_1,
	HOSTPORT_2,
	HOSTPORT_3,
	REPLICA_SET,

	USER1_USERNAME,
	USER2_USERNAME,
	USER3_USERNAME,
	USER4_USERNAME,
	USER1_EMAIL,
	USER2_EMAIL,
	USER3_EMAIL,
	USER4_EMAIL,
	USER1_PASSWORD,
	USER2_PASSWORD,
	USER3_PASSWORD,
	USER4_PASSWORD,
	USER1_ID,
	USER2_ID,
	USER3_ID,
	USER4_ID,
	MAX_BID_USER1,
	MAX_BID_USER2,
	MAX_BID_USER3,
	MAX_BID_USER4
} = process.env;

module.exports = {
	port: parseInt(PORT, 10) || 4000,
	appUrl: APP_URL,
	clientUrl: CLIENT_URL,
	rootPath: path.join(__dirname),
	mongodb: {
		connectionUrl: `mongodb://${DB_USER}:${DB_PASSWORD}@${HOSTNAME_1}:${HOSTPORT_1},${HOSTNAME_2}:${HOSTPORT_2},${HOSTNAME_3}:${HOSTPORT_3}/?authSource=${DB_NAME}&replicaSet=${REPLICA_SET}`,
		maxPoolSize: 10,
		database: DB_NAME,
		user: DB_USER
	},
	cookieOptions: {
		secure: NODE_ENV === 'production' ? true : false,
		httpOnly: true,
		path: '/'
	},
	users: [
		{
			username: USER1_USERNAME,
			id: USER1_ID,
			email: USER1_EMAIL,
			password: USER1_PASSWORD,
			role: 'regular',
			name: 'Rachel Bruce',
			img: 'assets/user1.jpg',
			maxBid: parseInt(MAX_BID_USER1, 10)
		},
		{
			username: USER2_USERNAME,
			id: USER2_ID,
			email: USER2_EMAIL,
			password: USER2_PASSWORD,
			role: 'regular',
			name: 'Charles Beck',
			img: 'assets/user2.jpg',
			maxBid: parseInt(MAX_BID_USER2, 10)
		},
		{
			username: USER3_USERNAME,
			id: USER3_ID,
			email: USER3_EMAIL,
			password: USER3_PASSWORD,
			role: 'seller',
			name: 'Jamila Junker',
			img: 'assets/seller.jpg',
			maxBid: parseInt(MAX_BID_USER3, 10)
		},
		{
			username: USER4_USERNAME,
			id: USER4_ID,
			email: USER4_EMAIL,
			password: USER4_PASSWORD,
			role: 'admin',
			name: 'James Mays',
			img: 'assets/admin.jpg',
			maxBid: parseInt(MAX_BID_USER4, 10)
		}
	]
};

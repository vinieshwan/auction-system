const { DB_NAME, DB_USER, DB_PASSWORD } = process.env;
const itemSchema = require('./itemSchema');
const bidSchema = require('./bidSchema');
const sessionSchema = require('./sessionSchema');

const itemSeed = require('./itemSeed');

const db = new Mongo('mongodblocal1:28017').getDB(DB_NAME);

db.getSiblingDB(DB_NAME);
db.createUser({
	user: DB_USER,
	pwd: DB_PASSWORD,
	roles: [{ role: 'readWrite', db: DB_NAME }]
});

db.getSiblingDB(DB_NAME).auth(DB_USER, DB_PASSWORD);
try {
	db.createCollection('items', {
		validator: {
			$jsonSchema: itemSchema
		}
	});
	db.items.createIndex({
		status: 1,
		handler: 1
	});
	db.items.createIndex(
		{
			handler: 1
		},
		{ unique: true }
	);
	db.items.insertMany(itemSeed);
	db.createCollection('bids', {
		validator: {
			$jsonSchema: bidSchema
		}
	});
	db.bids.createIndex(
		{
			userId: 1,
			itemId: 1
		},
		{ unique: true }
	);
	db.createCollection('sessions', {
		validator: {
			$jsonSchema: sessionSchema
		}
	});
	db.sessions.createIndex({
		userId: 1,
		roleId: 1
	});
	console.log('\n\n\n\n\n=====> DONE BUILDING!!! <======\n\n\n\n\n');
} catch (error) {
	console.log('=====>', error, '<======');
}

module.exports = {
	bsonType: 'object',
	required: [
		'userId',
		'itemId',
		'autoBidRunningPrice',
		'isAutoBid',
		'createdAt'
	],
	properties: {
		userId: {
			bsonType: 'objectId',
			description:
				'ID of the user that bids. Must be an objectId and is required'
		},
		itemId: {
			bsonType: 'objectId',
			description: 'ID of the item. Must be an objectId and is required'
		},
		autoBidRunningPrice: {
			bsonType: 'number',
			description:
				'Running bid price of an item. Must be a number and is required'
		},
		isAutoBid: {
			bsonType: 'bool',
			description: 'Flag for autobid. Must be a boolean and is required'
		},
		createdAt: {
			bsonType: 'date',
			description: 'Date the item was created. Must be a date and is required'
		},
		updatedAt: {
			bsonType: 'date',
			description: 'Date the item was updated. Must be a date and is required'
		}
	}
};

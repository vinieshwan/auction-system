module.exports = {
	bsonType: 'object',
	required: [
		'name',
		'type',
		'material',
		'condition',
		'startBid',
		'endBid',
		'runningPrice',
		'startPrice',
		'createdAt',
		'updatedAt',
		'status',
		'handler',
		'imagePath'
	],
	properties: {
		name: {
			bsonType: 'string',
			description: 'Name of an item. Must be a string and is required'
		},
		description: {
			bsonType: 'string',
			description: 'Description of an item. Must be a string and not required'
		},
		type: {
			bsonType: 'string',
			description: 'Type of an item. Must be a string and is required'
		},
		material: {
			bsonType: 'string',
			description:
				'Material that an item is made of. Must be a string and is required'
		},
		condition: {
			bsonType: 'string',
			description: 'Condition of the item. Must be a string and is required'
		},
		origin: {
			bsonType: 'string',
			description: 'Origin of the item. Must be a string and not required'
		},
		startBid: {
			bsonType: 'date',
			description:
				'Start date of the item ready to be auctioned. Must be a date and is required'
		},
		endBid: {
			bsonType: 'date',
			description:
				'End date of the item that is auctioned. Must be a date and is required'
		},
		runningPrice: {
			bsonType: 'number',
			description:
				'Running price of an item. Default value should equal to startPrice field. Must be a number and is required'
		},
		startPrice: {
			bsonType: 'number',
			description: 'Initial price of an item. Must be a number and is required'
		},
		createdAt: {
			bsonType: 'date',
			description: 'Date the item was created. Must be a date and is required'
		},
		updatedAt: {
			bsonType: 'date',
			description: 'Date the item was updated. Must be a date and is required'
		},
		status: {
			bsonType: 'string',
			enum: ['ongoing', 'upcoming', 'closed', 'inactive'],
			description:
				'Item status. Value must fall in the specified options and is required'
		},
		handler: {
			bsonType: 'string',
			description:
				'Slug address of an item. Default value can be an object ID. Must be a string and is required'
		},
		imagePath: {
			bsonType: 'object',
			required: ['large', 'medium', 'thumbnail'],
			properties: {
				large: {
					bsonType: 'string',
					description:
						'Path of the large image of the item. Must be a string and is required'
				},
				medium: {
					bsonType: 'string',
					description:
						'Path of the medium image of the item. Must be a string and is required'
				},
				thumbnail: {
					bsonType: 'string',
					description:
						'Path of the thumbnail image of the item. Must be a string and is required'
				}
			}
		},
		users: {
			bsonType: 'array',
			description:
				'List of all users that bids to this item. Must be a list of strings'
		}
	}
};

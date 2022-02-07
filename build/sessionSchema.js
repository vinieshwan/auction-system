module.exports = {
	bsonType: 'object',
	required: ['userId', 'roleId', 'createdAt', 'expiredOn'],
	properties: {
		userId: {
			bsonType: 'objectId',
			description: 'ID of the user. Must be an objectId and is required'
		},
		roleId: {
			bsonType: 'objectId',
			description: 'Role Id of the user. Must be an objectId and is required'
		},
		createdAt: {
			bsonType: 'date',
			description:
				'Date the session was created. Must be a date and is required'
		},
		expiredOn: {
			bsonType: 'date',
			description: 'Expiry date for the session. Must be a date and is required'
		}
	}
};

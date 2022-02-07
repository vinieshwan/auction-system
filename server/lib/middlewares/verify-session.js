'use strict';

const Ajv = require('ajv').default;

const ajv = new Ajv();

const validate = ajv.compile({
	type: 'object',
	additionalProperties: false,
	properties: {
		sId: {
			type: 'string',
			pattern: '^[0-9A-Fa-f]{24}$'
		},
		rId: {
			type: 'string',
			pattern: '^[0-9A-Fa-f]{24}$'
		}
	},
	required: ['sId', 'rId']
});

module.exports = ({ config, controllers, logger }) => {
	return async function verifySession(req, res, next) {
		const user = config.users.find((item) => {
			return item.role === 'admin';
		});

		if (user && req.headers['x-auth-admin'] === user.password) {
			req.isAdmin = true;

			return next();
		}

		if (!req.cookies) {
			logger.error({
				label: 'verifySession',
				message: 'Unauthorized Access'
			});

			res.clearCookie('rId');
			res.clearCookie('rId');

			return res.status(401).json({ message: 'Unauthorized Access' });
		}

		if (req.cookies.rId && !req.cookies.sId) {
			logger.error({
				label: 'verifySession',
				message: 'Unauthorized Access'
			});

			await controllers.sessions.forceExpire(
				{
					name: 'roleId',
					id: req.cookies.rId
				},
				{ retry: true }
			);

			res.clearCookie('rId');

			return res.status(401).json({ message: 'Unauthorized Access' });
		}
		if (req.cookies.sId && !req.cookies.rId) {
			logger.error({
				label: 'verifySession',
				message: 'Unauthorized Access'
			});

			await controllers.sessions.forceExpire(
				{
					name: 'sessionId',
					id: req.cookies.sId
				},
				{ retry: true }
			);

			res.clearCookie('sId');

			return res.status(401).json({ message: 'Unauthorized Access' });
		}

		if (
			!validate({
				sId: req.cookies.sId,
				rId: req.cookies.rId
			})
		) {
			logger.error({
				label: 'verifySession',
				message: 'Unauthorized Access'
			});

			return res.status(401).json({ message: 'Unauthorized Access' });
		}

		next();
	};
};

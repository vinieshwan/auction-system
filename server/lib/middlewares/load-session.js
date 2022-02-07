'use strict';

module.exports = ({ config, controllers, logger }) => {
	return async function loadSession(req, res, next) {
		if (req.isAdmin) {
			return next();
		}

		let session;

		try {
			session = await controllers.sessions.get(
				req.cookies.sId,
				req.cookies.rId
			);
		} catch (error) {
			logger.error({
				label: 'loadSession',
				message: error.message
			});

			if (error.message === 'Unauthorized Access') {
				return res.status(401).json({ message: 'Unauthorized Access' });
			}

			return res.status(500).json({ message: 'Internal Server Error' });
		}

		req.session = session;

		next();
	};
};

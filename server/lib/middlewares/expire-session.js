'use strict';

module.exports = (config, controllers, logger) => {
	return async function expireSession(req, res, next) {
		try {
			await controllers.sessions.expire(req.cookies.sId, req.cookies.rId);
		} catch (error) {
			logger.error({
				label: 'expireSession',
				message: 'Internal Server Error'
			});

			return res.status(500).json({ message: 'Internal Server Error' });
		}

		res.clearCookie('sId');
		res.clearCookie('rId');

		next();
	};
};

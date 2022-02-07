'use strict';

const Scrypt = require('scrypt-kdf');

module.exports = ({ config, controllers, logger }) => {
	return async function verifyAuthentication(req, res, next) {
		const user = config.users.find((item) => {
			return item.email === req.body.email;
		});

		if (!user) {
			logger.error({
				label: 'verifyAuthentication',
				message: 'Unauthorized Access'
			});

			return res.status(401).json({ message: 'Unauthorized Access' });
		}

		const isMatched = await Scrypt.verify(
			Buffer.from(user.password, 'base64'),
			Buffer.from(req.body.password, 'utf8')
		);

		if (!isMatched) {
			logger.error({
				label: 'verifyAuthentication',
				message: 'Unauthorized Access'
			});

			return res.status(401).json({ message: 'Unauthorized Access' });
		}

		req.user = user;

		next();
	};
};

'use strict';

const Ajv = require('ajv').default;
const addFormats = require('ajv-formats');

class LoginRoute {
	constructor(app, context) {
		this.app = app;
		this.config = context.config;
		this.controllers = context.controllers;
		this.middlewares = context.middlewares;
		this.logger = context.logger;

		const ajv = new Ajv();

		addFormats(ajv, ['email']);

		this.validate = ajv.compile({
			type: 'object',
			additionalProperties: false,
			properties: {
				email: {
					type: 'string',
					format: 'email',
					maxLength: 255
				},
				password: {
					type: 'string',
					minLength: 5,
					maxLength: 100
				}
			},
			required: ['email', 'password']
		});
	}

	setupRoute() {
		this.app.post(
			'/v1/login',
			this.verifyRequest.bind(this),
			this.middlewares.verifyAuthentication,
			this.generateSession.bind(this),
			this.sendResponse.bind(this)
		);

		this.app.get(
			'/v1/login',
			this.middlewares.verifySession,
			this.middlewares.loadSession,
			this.getUser.bind(this),
			this.sendUser.bind(this)
		);
	}

	verifyRequest(req, res, next) {
		if (!this.validate(req.body)) {
			this.logger.error({
				label: 'LoginRoute',
				message: 'verifyRequest - Invalid argument(s)',
				data: {
					body: req.body
				}
			});

			return res.status(400).json({ message: 'Bad request' });
		}

		next();
	}

	async generateSession(req, res, next) {
		if (!req.user) {
			this.logger.error({
				label: 'LoginRoute',
				message: 'generateSession',
				data: {
					body: req.body
				}
			});

			return res.status(401).json({ message: 'Unauthorized Access' });
		}

		try {
			req.session = await this.controllers.sessions.add(req.user.id);
		} catch (error) {
			this.logger.error({
				label: 'LoginRoute',
				message: 'generateSession',
				data: {
					body: error
				}
			});
			return res.status(500).json({ message: error.message });
		}

		if (!req.session && !req.session.sId) {
			this.logger.error({
				label: 'LoginRoute',
				message: 'generateSession - no session'
			});

			return res.status(500).json({ message: error.message });
		}

		next();
	}

	async sendResponse(req, res, next) {
		res.cookie('sId', req.session.sId.toString());
		res.cookie('rId', req.session.rId.toString());

		res.status(200).send({
			ok: true
		});
	}

	async getUser(req, res, next) {
		if (!req.session) {
			this.logger.error({
				label: 'LoginRoute',
				message: 'getUser',
				data: 'no session'
			});

			return res.status(401).json({ message: 'Unauthorized Access' });
		}

		const user = this.config.users.find((item) => {
			return item.id === req.session.userId.toString();
		});

		if (!user) {
			this.logger.error({
				label: 'LoginRoute',
				message: 'getUser',
				data: 'no user'
			});

			return res.status(401).json({ message: 'Unauthorized Access' });
		}

		req.user = {
			name: user.name,
			img: user.img,
			role: user.role
		};

		next();
	}

	async sendUser(req, res, next) {
		if (!req.user) {
			this.logger.error({
				label: 'LoginRoute',
				message: 'sendUser',
				data: 'no user'
			});

			return res.status(500).json({ message: 'Internal Server Error' });
		}

		res.status(200).send({
			ok: true,
			data: req.user
		});
	}
}

module.exports = LoginRoute;

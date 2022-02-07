'use strict';

const express = require('express');
const helmet = require('helmet');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const { logger, date } = require('./utils');

const { ItemsModel, BidsModel, SessionsModel } = require('./models');
const { AutobidEvent } = require('./events');
const {
	ItemsController,
	BidsController,
	SessionsController
} = require('./controllers');
const {
	verifyAuthentication,
	expireSession,
	loadSession,
	verifySession
} = require('./middlewares');
const {
	ItemsListRoute,
	GetItemRoute,
	PostBidRoute,
	ListBidRoute,
	LoginRoute,
	LogoutRoute,
	AutoBidRoute
} = require('./routes');

class Server {
	constructor(config) {
		this.app = app;
		this.config = config;
		this.logger = logger;
		this.utils = {
			date
		};
		this.models = {};
		this.controllers = {};
		this.middlewares = {};
	}

	async start() {
		await this.loadDependencies();
		await this.loadModels();
		await this.loadMiddlewares();
		await this.loadControllers();
		await this.loadRoutes();
		await this.startListening();
	}

	async loadDependencies() {
		this.app.use(
			cors({
				origin: this.config.clientUrl,
				credentials: true,
				exposedHeaders: ['Set-Cookie']
			})
		);
		this.app.use(cookieParser(this.config.cookieOptions));
		this.app.use(helmet());

		this.app.use(bodyParser.json());
	}

	async loadModels() {
		const { connectionUrl, maxPoolSize, database } = this.config.mongodb;

		const mongodbClient = new MongoClient(connectionUrl, {
			maxPoolSize
		});

		try {
			await mongodbClient.connect();
		} catch (error) {
			this.logger.error({
				label: 'Server',
				message: error.message
			});
		}

		this.models.items = new ItemsModel(mongodbClient, { database });
		this.models.bids = new BidsModel(mongodbClient, { database });
		this.models.sessions = new SessionsModel(mongodbClient, { database });

		const pipeline = [
			{
				$match: {
					$and: [
						{
							operationType: 'update',
							'updateDescription.updatedFields.users': { $exists: true }
						},
						{
							operationType: 'update',
							'updateDescription.updatedFields.runningPrice': { $exists: true }
						}
					]
				}
			}
		];

		const autobidEvent = new AutobidEvent(mongodbClient, {
			database,
			config: this.config,
			logger: this.logger
		});
		autobidEvent.watch(30000, ItemsModel.getCollectionName(), pipeline);
	}

	async loadControllers() {
		this.controllers.items = new ItemsController({
			config: this.config,
			models: this.models,
			utils: this.utils
		});

		this.controllers.bids = new BidsController({
			config: this.config,
			models: this.models,
			utils: this.utils
		});

		this.controllers.sessions = new SessionsController({
			config: this.config,
			models: this.models,
			utils: this.utils
		});
	}

	async loadMiddlewares() {
		const context = {
			config: this.config,
			controllers: this.controllers,
			logger: this.logger
		};

		this.middlewares.verifyAuthentication = verifyAuthentication(context);
		this.middlewares.expireSession = expireSession(context);
		this.middlewares.loadSession = loadSession(context);
		this.middlewares.verifySession = verifySession(context);
	}

	async loadRoutes() {
		const context = {
			config: this.config,
			controllers: this.controllers,
			logger: this.logger,
			middlewares: this.middlewares
		};

		const itemsListRoute = new ItemsListRoute(this.app, context);
		itemsListRoute.setupRoute();

		const getItemRoute = new GetItemRoute(this.app, context);
		getItemRoute.setupRoute();

		const postBidRoute = new PostBidRoute(this.app, context);
		postBidRoute.setupRoute();

		const listBidRoute = new ListBidRoute(this.app, context);
		listBidRoute.setupRoute();

		const loginRoute = new LoginRoute(this.app, context);
		loginRoute.setupRoute();

		const logoutRoute = new LogoutRoute(this.app, context);
		logoutRoute.setupRoute();

		const autoBidRoute = new AutoBidRoute(this.app, context);
		autoBidRoute.setupRoute();
	}

	async startListening() {
		const { port } = this.config;

		this.app.listen(port, () => {
			console.log(`Listening to port: ${port}`);

			this.logger.info({
				label: 'Server',
				message: `Listening to port: ${port}`
			});
		});
	}
}

module.exports = Server;

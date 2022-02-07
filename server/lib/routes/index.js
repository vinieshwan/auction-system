'use strict';

module.exports = {
	ItemsListRoute: require('./items/list'),
	GetItemRoute: require('./items/get'),
	PostBidRoute: require('./bids/post'),
	ListBidRoute: require('./bids/list'),
	LoginRoute: require('./auth/login'),
	LogoutRoute: require('./auth/logout'),
	AutoBidRoute: require('./bids/enable-auto-bid')
};

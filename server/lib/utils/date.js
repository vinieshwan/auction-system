'use strict';

module.exports = {
	timeOut: function (delay) {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve(true);
			}, delay);
		});
	}
};

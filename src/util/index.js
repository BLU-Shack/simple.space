module.exports = {
	get check() { return require('./check.js'); },
	get isObject() { return require('./isObject.js'); },
	get clientEvents() { return require('./events.js'); },
	get stream() { return require('./stream.js'); }
};
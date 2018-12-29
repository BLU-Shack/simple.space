class Check {
	constructor() {
		throw new Error('Not to be initiated.');
	}

	static edit(options) {
		if (!options.userToken && !options.botToken) throw new ReferenceError('Either a user/bot API token must be provided.');
		if (typeof options.userToken !== 'string' && !options.botToken) throw new TypeError('options.userToken must be a string.');
		if (typeof options.botToken !== 'string' && !options.userToken) throw new TypeError('options.botToken must be a string.');
		if (typeof options.cache !== 'boolean') throw new TypeError('options.cache must be boolean.');
		if (typeof options.autoCache !== 'boolean') throw new TypeError('options.autoCache must be boolean.');
		if (typeof options.autoCacheInterval !== 'number') throw new TypeError('options.autoCacheInterval must be a number.');
		if (options.autoCacheInterval <= 30000) throw new RangeError('options.autoCacheInterval must be greater than 30000 milliseconds');
		return options;
	}
}

module.exports = Check;
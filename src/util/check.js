class Check {
	constructor() {
		throw new Error('Not to be initiated.');
	}

	static edit(options) {
		if (options.token && typeof options.token !== 'string') throw new TypeError('options.token must be a string.');
		if (options.botID && typeof options.botID !== 'string') throw new TypeError('options.botID must be a string.');
		if (typeof options.log !== 'boolean') throw new TypeError('options.log must be boolean.');
		if (typeof options.cache !== 'boolean') throw new TypeError('options.cache must be boolean.');
		if (typeof options.cacheUpdateTimer !== 'number') throw new TypeError('options.cacheUpdateTimer must be a number.');
		if (options.cacheUpdateTimer < 500) throw new RangeError('options.cacheUpdateTimer must be greater than 500 milliseconds.');
		return false;
	}
}

module.exports = Check;
class Check {
	static edit(options) {
		if (typeof options.userToken !== 'string' && options.userToken !== null) throw new TypeError('options.userToken must be a string.');
		else if (typeof options.botToken !== 'string' && options.botToken !== null) throw new TypeError('options.botToken must be a string.');
		else if (typeof options.cache !== 'boolean') throw new TypeError('options.cache must be boolean.');
		else if (typeof options.autoCache !== 'boolean') throw new TypeError('options.autoCache must be boolean.');
		else if (typeof options.autoCacheInterval !== 'number') throw new TypeError('options.autoCacheInterval must be a number.');
		else if (options.autoCacheInterval <= 30000) throw new RangeError('options.autoCacheInterval must be greater than 30000 milliseconds');
		else return options;
	}
}

module.exports = Check;
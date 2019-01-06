module.exports = options => {
	if (options.userToken === null && options.botToken === null) throw new ReferenceError('Either a userToken or a botToken must be present.');
	else if (typeof options.userToken !== 'string' && options.userToken !== null) throw new TypeError('options.userToken must be a string.');
	else if (typeof options.botToken !== 'string' && options.botToken !== null) throw new TypeError('options.botToken must be a string.');
	else if (typeof options.botID !== 'string' && options.botID !== null) throw new TypeError('options.botID must be a string.');
	else if (typeof options.cache !== 'boolean') throw new TypeError('options.cache must be boolean.');
	else if (typeof options.version !== 'number') throw new TypeError('options.version must be a number.');
	else return options;
};
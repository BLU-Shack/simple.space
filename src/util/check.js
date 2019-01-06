module.exports = options => {
	if (typeof options.botToken !== 'string' && options.botToken !== null) throw new TypeError('options.botToken must be a string.');
	else if (typeof options.botID !== 'string' && options.botID !== null) throw new TypeError('options.botID must be a string.');
	else if (typeof options.cache !== 'boolean') throw new TypeError('options.cache must be boolean.');
	else if (typeof options.version !== 'number') throw new TypeError('options.version must be a number.');
	else return options;
};
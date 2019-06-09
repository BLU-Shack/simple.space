/* eslint-disable curly */

exports.edit = options => {
	if ('userToken' in options) process.emitWarning('options#userToken - Obsolete in its use.', 'DeprecationWarning');
	if (typeof options.botToken !== 'string' && options.botToken !== null)
		throw new TypeError('options.botToken must be a string.');
	else if (typeof options.botID !== 'string' && options.botID !== null)
		throw new TypeError('options.botID must be a string.');
	else if (typeof options.cache !== 'boolean')
		throw new TypeError('options.cache must be boolean.');
	else if (typeof options.version !== 'number')
		throw new TypeError('options.version must be a number.');
	else
		return options;
};

exports.fetch = options => {
	if ('userToken' in options) process.emitWarning('options#userToken - Obsolete in its use.', 'DeprecationWarning');
	if (typeof options.cache !== 'boolean')
		throw new TypeError('options.cache must be boolean.');
	else if (typeof options.raw !== 'boolean')
		throw new TypeError('options.raw must be boolean.');
	else if (typeof options.version !== 'number')
		throw new TypeError('options.version must be a number.');
	else if (typeof options.botToken !== 'string' && options.botToken !== null)
		throw new TypeError('options.botToken must be a string.');
	else
		return options;
};

exports.multi = options => {
	exports.fetch(options);

	if (typeof options.mapify !== 'boolean')
		throw new TypeError('options.mapify must be boolean.');
	else
		return options;
};

exports.post = options => {
	if (typeof options.botToken !== 'string' && options.botToken !== null)
		throw new TypeError('options.botToken must be a string.');
	else if (typeof options.version !== 'number')
		throw new TypeError('options.version must be a number.');
	else if (!Array.isArray(options.countOrShards) && typeof options.countOrShards !== 'number' && options.countOrShards !== null)
		throw new TypeError('options.countOrShards must be a number, array of numbers, or null.');
	else
		return options;
};
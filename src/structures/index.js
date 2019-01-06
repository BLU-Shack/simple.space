const { ClientOpts, FetchOpts, MultiFetchOpts, PostOpts } = require('./options.js');

module.exports = {
	get Base() { return require('./Base.js'); },
	get Bot() { return require('./Bot.js'); },
	get Guild() { return require('./Guild.js'); },
	get User() { return require('./User.js'); },
	get Upvote() { return require('./Upvote.js'); },

	get FetchError() { return require('./Errors/FetchError.js'); },
	get Ratelimit() { return require('./Errors/Ratelimit.js'); },
	get Stats() { return require('./Stats.js'); },

	get ClientOpts() { return ClientOpts; },
	get FetchOpts() { return FetchOpts; },
	get MultiFetchOpts() { return MultiFetchOpts; },
	get PostOpts() { return PostOpts; },
};
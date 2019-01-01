const { ClientOptions, FetchOptions, MultiFetchOptions, PostOptions } = require('./options/');

module.exports = {
	get Base() { return require('./Base.js'); },
	get Bot() { return require('./Bot.js'); },
	get Guild() { return require('./Guild.js'); },
	get User() { return require('./User.js'); },
	get Upvote() { return require('./Upvote.js'); },

	get FetchError() { return require('./Errors/FetchError.js'); },
	get Ratelimit() { return require('./Errors/Ratelimit.js'); },
	get Stats() { return require('./Stats.js'); },

	ClientOptions, FetchOptions, PostOptions, MultiFetchOptions
};
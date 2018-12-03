exports.Classes = {
	get PartialUser() { return require('./PartialUser.js').PartialUser; },
	get UpvoteUser() { return require('./UpvoteUser.js').UpvoteUser; },
	get WebhookUser() { return require('./WebhookUser.js').WebhookUser; },
	get Base() { return require('./Base.js').Base; },

	get Bot() { return require('./Bot.js').Bot; },
	get Emoji() { return require('./Emoji.js').Emoji; },
	get Guild() { return require('./Guild.js').Guild; },
	get User() { return require('./User.js').User; },

	get ClientOptions() { return require('./options/ClientOptions.js').ClientOptions; },
	get FetchOptions() { return require('./options/FetchOptions.js').FetchOptions; },
	get PostOptions() { return require('./options/PostOptions.js').PostOptions; },
	get UpvoteFetchOptions() { return require('./options/UpvoteFetchOptions.js').UpvoteFetchOptions; },

	get FetchError() { return require('./FetchError.js').FetchError; },
	get Stats() { return require('./Stats.js').Stats; },
	get Store() { return require('@ired_me/red-store'); },
	get WebhookInfo() { return require('./WebhookInfo.js').WebhookInfo; }
};
module.exports = {
	get Base() { return require('./Base.js'); },

	get Bot() { return require('./Bot.js'); },
	get Emoji() { return require('./Emoji.js'); },
	get Guild() { return require('./Guild.js'); },
	get User() { return require('./User.js'); },

	get FetchError() { return require('./FetchError.js'); },
	get Stats() { return require('./Stats.js'); },
	get UpvoteContents() { return require('./UpvoteContents.js'); }
};
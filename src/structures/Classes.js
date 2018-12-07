exports.Classes = {
	get PartialUser() { return require('./PartialUser.js').PartialUser; },
	get Base() { return require('./Base.js').Base; },

	get Bot() { return require('./Bot.js').Bot; },
	get Emoji() { return require('./Emoji.js').Emoji; },
	get Guild() { return require('./Guild.js').Guild; },
	get User() { return require('./User.js').User; },

	get FetchError() { return require('./FetchError.js').FetchError; },
	get Stats() { return require('./Stats.js').Stats; },
	get Store() { return require('@ired_me/red-store'); },
	get UpvoteContents() { return require('./UpvoteContents.js').UpvoteContents; }
};
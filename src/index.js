const Classes = require('./structures/Classes.js').Classes;
const Options = require('./options/');
const Client = require('./Client.js');

module.exports = {
	// The Client and Version
	get Client() { return Client; },
	get version() { return require('../package.json').version; },

	// The Main Classes
	get Bot() { return Classes.Bot; },
	get Emoji() { return Classes.Emoji; },
	get Guild() { return Classes.Guild; },
	get User() { return Classes.User; },

	// The Extension Classes
	get PartialUser() { return Classes.PartialUser; },
	get UpvoteUser() { return Classes.UpvoteUser; },
	get Base() { return Classes.Base; },

	// All Options.
	get ClientOptions() { return Options.ClientOptions; },
	get FetchOptions() { return Options.FetchOptions; },
	get PostOptions() { return Options.PostOptions; },
	get UpvoteFetchOptions() { return Options.UpvoteFetchOptions; },

	// Misc Classes
	get FetchError() { return Classes.FetchError; },
	get Stats() { return Classes.Stats; },
	get Store() { return Classes.Store; }
};
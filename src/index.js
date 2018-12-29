const Classes = require('./structures/');
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
	get Base() { return Classes.Base; },

	// Misc Classes
	get FetchError() { return Classes.FetchError; },
	get Stats() { return Classes.Stats; },
	get Store() { return Classes.Store; }
};
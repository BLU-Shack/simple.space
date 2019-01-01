/**
 * @typedef {object} ClientOptions The options supplied on instantiating the client.
 * @property {string} [botToken] The bot's API Token (not the bot's Discord token!) Required for most endpoints.
 * @property {string} [botID] The bot's ID.
 * @property {string} [userToken] Your site token. Required for most endpoints.
 * @property {boolean} [cache=false] Whether or not to cache bots, guilds, emojis, or users on fetch.
 * @property {boolean} [autoCache=false] Whether or not to automatically cache all bots.
 * @property {number} [autoCacheInterval=60000] The number of milliseconds to wait for each auto cache interval.
 * @property {number} [version=1] The default version of the API to use when fetching and posting.
 */

module.exports = {
	botToken: null,
	botID: null,
	userToken: null,
	cache: false,
	autoCache: false,
	autoCacheInterval: 60000,
	version: 1
};
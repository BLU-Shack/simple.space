/**
 * @typedef {object} FetchOptions Options available to pass when fetching something, etc. a bot.
 * @property {boolean} [cache=this.options.cache] When set to true, caches the fetched object into a Store/Set value.
 * Corrosponds to {@link ClientOptions#cache} when not present while fetching.
 * @property {boolean} [version=this.options.version] The version to use to fetch an endpoint.
 * @property {boolean} [raw=false] When set to true, returns the raw fetched object.
 * @property {string} [userToken=this.options.userToken] Your authorization token given from the site.
 * @property {string} [botToken=this.options.botToken] One of your bot's authorization token from the site.
 */
module.exports = {
	cache: false,
	raw: false,
	version: 1,
	userToken: null,
	botToken: null,
};
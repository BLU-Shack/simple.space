/**
 * @typedef {object} ClientOptions The options supplied on instantiating the client.
 * @property {string} [botToken=null] The bot's API token from the site. Required for some endpoints.
 * @property {string} [botID=null] The bot's ID.
 * @property {boolean} [cache=false] Whether or not to cache bots/users on fetch.
 * @property {number} [statsLimit=3] The limit on the number of cached Statistics in {@link Client#stats}
 * @property {number} [version=1] The default version of the API to use when fetching and posting.
 */
exports.ClientOpts = {
	botToken: null,
	botID: null,
	cache: false,
	statsLimit: 3,
	version: 1
};

/**
 * @typedef {object} FetchOptions Options available to pass when fetching something, etc. a bot.
 * @property {boolean} [cache=this.options.cache] When set to true, caches the fetched object into a Store/Set value.
 * Corrosponds to {@link ClientOptions#cache} when not present.
 * @property {boolean} [version=this.options.version] The version to use to fetch an endpoint.
 * Corrosponds to {@link ClientOptions#version} when not present.
 * @property {boolean} [raw=false] When set to true, returns the raw fetched object.
 * @property {string} [botToken=this.options.botToken] One of your bot's authorization token from the site.
 * Corrosponds to {@link ClientOptions#botToken} when not present.
 */
exports.FetchOpts = {
	cache: false,
	raw: false,
	version: 1,
	botToken: null,
};

/**
 * @typedef {object} MultiFetchOptions Options when a given output is an array.
 * @property {boolean} [cache=this.options.cache] When set to true, caches the fetched object into a Store/Set value.
 * Corrosponds to {@link ClientOptions#cache} when not present while fetching.
 * @property {boolean} [raw=false] When set to true, returns the raw fetched object.
 * @property {boolean} [version=this.options.version] The API version to use for GETting.
 * Corrosponds to {@link ClientOptions#version} when not present.
 * @property {boolean} [mapify=true] When set to true, the fetched value will be in a Store, mapped by their IDs
 * @property {string} [botToken=this.options.botToken] One of your bot's authorization token from the site.
 * The token should be related to the bot ID of fetch. Uses {@link ClientOptions#botToken} if omitted.
 * @property {number} [page=1] The section of the endpoint to take.
 */
exports.MultiFetchOpts = {
	...exports.FetchOpts,
	mapify: true,
	page: 1,
};

/**
 * @typedef {object} PostOptions Options when POSTing bot count.
 * @property {number | number[]} [countOrShards=null] The server count/array of shards that the bot currently has.
 * @property {string} [botToken=this.options.botToken] The bot authorization token to use for authenticating the POST.
 * The token should be related to the bot ID of POST. Uses {@link ClientOptions#botToken} if omitted.
 * @property {boolean} [version=this.options.version] The API version to use for POSTing.
 * Corrosponds to {@link ClientOptions#version} when not present.
 */
exports.PostOpts = {
	countOrShards: null,
	botToken: null,
	version: 1
};
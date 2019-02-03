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
 * Corrosponds to {@link ClientOptions#cache} when not present while fetching.
 * @property {boolean} [version=this.options.version] The version to use to fetch an endpoint.
 * @property {boolean} [raw=false] When set to true, returns the raw fetched object.
 * @property {string} [botToken=this.options.botToken] One of your bot's authorization token from the site.
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
 * @property {boolean} [version=this.options.version] The version to use to fetch an endpoint.
 * @property {boolean} [mapify=true] When set to true, the fetched value will be in a Store, mapped by their IDs.
 * @property {string} [userToken=this.options.userToken] Your authorization token given from the site.
 * @property {string} [botToken=this.options.botToken] One of your bot's authorization token from the site.
 * @property {number} [page=1] The section of the endpoint to take.
 * @property {boolean} [reverse=false] When set to true, reverses the output. Only works with `v1/bots` and `v1/users/:id/bots`,
 * or `Client.fetchBots()` and `Client.fetchBotsOfUser()` respectively. Requires {@link MultiFetchOptions#sortBy} to have value.
 * Example: `server_count`: It will sort the response by the bot with least to greatest server count.
 * @property {string} [sortBy=null] A raw bot object's property to sort by. This should not be the Class' property.
 * To see a raw object's property, check [here](https://docs.botlist.space/bl-docs/bots), under the Response tab.
 * Example: `server_count`; It will sort the response by the bot with greatest to least server count.
 */
exports.MultiFetchOpts = {
	...exports.FetchOpts,
	mapify: true,
	page: 1,
	reverse: false,
	sortBy: null,
};

/**
 * @typedef {object} PostOptions Options when POSTing bot count.
 * @property {number | number[]} [countOrShards=null] The server count/array of shards that the bot currently has.
 * @property {string} [botToken=this.options.botToken] The bot authorization token to use for authenticating the POST.
 * Must be the token corrosponding. Uses {@link ClientOptions#botToken} if omitted.
 * @property {boolean} [version=this.options.version] The version to use to fetch an endpoint.
 */
exports.PostOpts = {
	countOrShards: null,
	botToken: null,
	version: 1
};
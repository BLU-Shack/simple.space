const FetchOptions = require('./FetchOptions.js');

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
 */
module.exports = {
	...FetchOptions,
	mapify: true,
	page: 1
};
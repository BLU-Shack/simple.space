/**
 * @typedef {object} FetchOptions Options available to pass when fetching something, etc. a bot.
 * @property {boolean} [cache=this.options.cache] When set to true, caches the fetched object into a Store/Set value.
 * Corrosponds to {@link ClientOptions#cache} if not set.
 * @property {boolean} [mapify=false] When set to true, the fetched value (only when fetching all bots) will be in a Store,
 * mapped by their IDs.
 */
module.exports = {
	cache: false,
	mapify: false
};
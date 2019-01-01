/**
 * @typedef {object} PostOptions Options when POSTing bot count.
 * @property {number | number[]} [countOrShards=null] The server count/array of shards that the bot currently has.
 * @property {string} [botToken=this.options.botToken] The bot authorization token to use for authenticating the POST.
 * Must be the token corrosponding. Uses {@link ClientOptions#botToken} if omitted.
 * @property {boolean} [version=this.options.version] The version to use to fetch an endpoint.
 */
module.exports = {
	countOrShards: null,
	botToken: null,
	version: 1
};
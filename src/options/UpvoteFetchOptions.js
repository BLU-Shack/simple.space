const { ClientOptions, FetchOptions } = require('./index.js');

/**
 * Fetch Options when fetching a bot's upvotes.
 * @class
 * @extends {FetchOptions}
 */
class UpvoteFetchOptions extends FetchOptions {
	/**
     * @param {object} [options={}] Upvote Fetch Options.
     * @param {ClientOptions} [client] The original ClientOptions
     */
	constructor(options = {}, client = ClientOptions.default) {
		super(options, client);

		/**
         * Whether or not to only fetch the user IDs. Overrides {@link FetchOptions#specified} to null
         * @type {?boolean}
         */
		this.ids = typeof options.ids !== 'undefined' ? options.ids : false;
		if (typeof this.ids !== 'boolean') throw new TypeError('options.ids must be boolean.');
		if (this.ids) this.specified = null;

		/**
         * The API token. Overrides ``this.options.token.``
         * @type {?string}
         */
		this.token = options.token || client.token;
		if (typeof this.token !== 'string' && this.token !== null) throw new TypeError('options.token must be a string.');

		/**
         * The bot ID. Overrides ``this.options.botID``
         * @type {?string}
         */
		this.botID = options.botID || client.botID;
		if (typeof this.botID !== 'string' && this.botID !== null) throw new TypeError('options.botID must be a string.');
	}
}

exports.UpvoteFetchOptions = UpvoteFetchOptions;
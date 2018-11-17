const FetchOptions = require('./FetchOptions').FetchOptions;
const ClientOptions = require('./ClientOptions.js').ClientOptions;

/**
 * Fetch Options when fetching a bot's upvotes.
 * @class
 */
class UpvoteFetchOptions extends FetchOptions {
    /**
     * @param {Object} [options={}] Upvote Fetch Options.
     * @param {ClientOptions} [client] The original ClientOptions
     */
    constructor(options = {}, client = ClientOptions.default) {
        super(options, client);

        /**
         * Whether or not to only fetch the user IDs. Overrides {@link FetchOptions#specified} to false.
         * @type {Boolean}
         */
        this.ids = options.ids || false;
        if (typeof this.ids !== 'boolean') throw new TypeError('options.ids must be boolean.');
        if (this.ids) this.specified = false;

        /**
         * The API token. ``Overrides this.options.token.``
         * @type {String}
         */
        this.token = options.token || client.token;
        if (typeof this.token !== 'string' && typeof this.token !== 'boolean') throw new TypeError('options.token must be a string.');
    }
}

exports.UpvoteFetchOptions = UpvoteFetchOptions;
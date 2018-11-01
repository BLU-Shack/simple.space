const FetchOptions = require('./FetchOptions').FetchOptions;
const ClientOptions = require('./ClientOptions.js').ClientOptions;

/**
 * Fetch Options when fetching a bot's upvotes.
 * @class
 */
class UpvoteFetchOptions extends FetchOptions {
    /**
     * @param {UpvoteFetchOptions} [options={}] Upvote Fetch Options.
     * @param {ClientOptions} [client] The original ClientOptions
     * @property {Boolean} [ids=false] Whether or not to return only the user IDs.
     * @property {String} [token=this.options.token] The token to use.
     */
    constructor(options = {}, client = { options: new ClientOptions(ClientOptions.default) }) {
        super(options);

        this.ids = options.ids || false;
        this.token = options.token || client.options.token;
    }
}

exports.UpvoteFetchOptions = UpvoteFetchOptions;
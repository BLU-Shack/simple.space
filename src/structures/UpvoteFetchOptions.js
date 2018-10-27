const FetchOptions = require('./FetchOptions').FetchOptions;

class UpvoteFetchOptions extends FetchOptions {
    /**
     * @param {UpvoteFetchOptions} options Upvote Fetch Options.
     */
    constructor(options) {
        super(options);

        /**
         * Whether or not to only return the user IDs.
         */
        this.ids = options.ids || false;
    }
}

exports.UpvoteFetchOptions = UpvoteFetchOptions;
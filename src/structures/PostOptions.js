class PostOptions {
    /**
     * @param {Object} options Options to override the preconfigured options.
     * @param {Object} preset Preconfigured options.
     */
    constructor(options, preset) {
        /**
         * The API token for posting.
         * @type {String}
         */
        this.token = options.token || preset.token;

        /**
         * The bot ID for posting.
         * @type {String}
         */
        this.botID = options.botID || preset.botID;

        /**
         * The size number/array for posting.
         * @type {Number|Array<Number>}
         */
        this.guildSize = options.guildSize || (preset.client ? preset.client.guilds.size : false);
    }
}

exports.PostOptions = PostOptions;
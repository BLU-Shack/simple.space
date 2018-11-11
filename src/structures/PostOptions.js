/**
 * Options when Posting.
 * @class
 * @constructor
 */
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
        if (!options.token) throw new ReferenceError('options.token must be defined.');
        if (typeof options.token !== 'string') throw new TypeError('options.token must be a string.');

        /**
         * The bot ID for posting.
         * @type {String}
         */
        this.botID = options.botID || preset.botID;
        if (!options.botID) throw new ReferenceError('options.botID must be defined.');
        if (typeof options.botID !== 'string') throw new TypeError('options.botID must be a string.');

        /**
         * The size number/array for posting.
         * @type {Number|Array<Number>}
         */
        this.guildSize = options.guildSize || (preset.client ? preset.client.guilds.size : false);
        if (!this.guildSize) throw new ReferenceError('guildSize must be defined.');
        if (typeof this.guildSize !== 'number' && !(this.guildSize instanceof Array)) throw new TypeError('options.guildSize must be either a number or an array of numbers.');
    }

    /**
     * The returned data.
     * @type {String}
     */
    get data() {
        return this.guildSize instanceof Array ? JSON.stringify({ shards: this.guildSize }) : JSON.stringify({ server_count: this.guildSize });
    }
}

exports.PostOptions = PostOptions;
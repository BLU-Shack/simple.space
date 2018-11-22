const ClientOptions = require('./ClientOptions.js').ClientOptions;

/**
 * Options when Posting.
 * @class
 */
class PostOptions {
    /**
     * @param {object} options Options to override the preconfigured options.
     * @param {ClientOptions} [preset=ClientOptions.default] Preset Client Options.
     */
    constructor(options, preset = ClientOptions.default) {
        /**
         * The discord.js#Client object. Usable to not require the guildSize parameter.
         * @type {*}
         */
        this.client = options.client || preset.client;

        /**
         * The bot ID for posting.
         * @type {?string}
         */
        this.botID = options.botID || preset.botID;
        if (!this.botID) throw new ReferenceError('options.botID must be defined.');
        if (typeof this.botID !== 'string') throw new TypeError('options.botID must be a string.');

        /**
         * The size number/array for posting.
         * @type {?number|number[]}
         */
        this.guildSize = options.guildSize || (this.client ? this.client.guilds.size : null);
        if (this.guildSize === null) throw new ReferenceError('guildSize must be defined.');
        if (typeof this.guildSize !== 'number' && !(this.guildSize instanceof Array)) throw new TypeError('options.guildSize must be either a number or an array of numbers.');

        /**
         * The API token for posting.
         * @type {?string}
         */
        this.token = options.token || preset.token;
        if (!this.token) throw new ReferenceError('options.token must be defined.');
        if (typeof this.token !== 'string') throw new TypeError('options.token must be a string.');
    }

    /**
     * The returned data.
     * @readonly
     * @type {string}
     */
    get data() {
        return this.guildSize instanceof Array ? JSON.stringify({ shards: this.guildSize }) : JSON.stringify({ server_count: this.guildSize });
    }
}

exports.PostOptions = PostOptions;
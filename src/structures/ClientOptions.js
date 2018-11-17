/**
 * Options that are supplied on initialization.
 * @class
 */
class ClientOptions {
    /**
     * @param {Object} newObj The new client options.
     * @param {Object} [oldObj=ClientOptions.default] The preset or default client options.
     */
    constructor(newObj, oldObj = ClientOptions.default) {
        /**
         * Whether or not to cache every bot, emoji, and guild existing on the site.
         * @type {Boolean}
         */
        this.cache = newObj.hasOwnProperty('cache') ? newObj.cache !== 'none' ? newObj.cache : false : oldObj.cache;

        /**
         * The number of milliseconds to wait until the cache is automatically updated. Set to ``0`` to disable automatic cache updating. Note that updating may not be consistent, and may be later than intended.
         * @type {Number}
         */
        this.cacheUpdateTimer = newObj.hasOwnProperty('cacheUpdateTimer') ? newObj.cacheUpdateTimer !== 'none' ? newObj.cacheUpdateTimer : oldObj.cacheUpdateTimer : oldObj.cacheUpdateTimer;

        /**
         * The API token, required for some functions to work properly.
         * @type {string|false}
         */
        this.token = newObj.hasOwnProperty('token') ? newObj.token !== 'none' ? newObj.token : false : oldObj.token;

        /**
         * The Bot ID, used for self actions and posting guild count.
         * @type {string|false}
         */
        this.botID = newObj.hasOwnProperty('botID') ? newObj.botID !== 'none' ? newObj.botID : false : oldObj.botID;

        /**
         * The discord.js#Client object.
         * @type {Client}
         */
        this.client = newObj.hasOwnProperty('client') ? newObj.client !== 'none' ? newObj.client : false : oldObj.token;

        /**
         * Whether or not to log everything when fetching something.
         * @type {boolean}
         */
        this.log = newObj.hasOwnProperty('log') ? newObj.log !== 'none' ? newObj.log : false : oldObj.log;
    }

    /**
     * The default client options.
     * @static
     */
    static get default() {
        return {
            cache: false,
            cacheUpdateTimer: 180000,
            client: 'none',
            botID: 'none',
            token: 'none',
            log: false
        };
    }
}

exports.ClientOptions = ClientOptions;
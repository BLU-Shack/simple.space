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
            token: 'none',
            botID: 'none',
            client: 'none',
            log: false
        };
    }
}

exports.ClientOptions = ClientOptions;
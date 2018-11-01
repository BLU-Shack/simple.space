/**
 * Options that are supplied on initialization.
 * @class
 */
class ClientOptions {
    /**
     * @constructor
     * @param {Object} newObj The new client options.
     * @param {Object} oldObj The preset or default client options.
     */
    constructor(newObj, oldObj) {
        /**
         * The API token, required for some functions to work properly.
         * @type {String|false}
         */
        this.token = newObj.hasOwnProperty('token') ? newObj.token !== 'none' ? newObj.token : false : oldObj.token;

        /**
         * The Bot ID, used for self actions and posting guild count.
         * @type {String|false}
         */
        this.botID = newObj.hasOwnProperty('botID') ? newObj.botID !== 'none' ? newObj.botID : false : oldObj.botID;

        /**
         * The discord.js#Client object.
         * @type {Object|false}
         */
        this.client = newObj.hasOwnProperty('client') ? newObj.client !== 'none' ? newObj.client : false : oldObj.token;

        /**
         * Whether or not to log FETCH actions.
         * @type {Boolean}
         */
        this.log = newObj.hasOwnProperty('log') ? newObj.log !== 'none' ? newObj.log : false : oldObj.log;
    }

    /**
     * The default client options.
     * @namespace
     * @static
     */
    static get default() {
        return {
            /**
             * The API token, required for some functions to work properly.
             * @type {String}
             */
            token: 'none',
            /**
             * The Bot ID, used for self actions and posting guild count.
             * @type {String}
             */
            botID: 'none',
            /**
             * @
             */
            client: 'none',
            log: false
        };
    }
}

exports.ClientOptions = ClientOptions;
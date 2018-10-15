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
         * The API token, required for some functions.
         * @type {String|false}
         */
        this.token = newObj.hasOwnProperty('token') ? newObj.token !== 'none' ? newObj.token : false : oldObj.token;
        /**
         * The discord.js#Client object.
         * @type {Object|false}
         */
        this.client = newObj.hasOwnProperty('client') ? newObj.client !== 'none' ? newObj.client : false : oldObj.token;
        /**
         * The Bot ID, needed for "self" actions and to set guild count.
         * @type {String|false}
         */
        this.botID = newObj.hasOwnProperty('botID') ? newObj.botID !== 'none' ? newObj.botID : false : oldObj.botID;
        /**
         * Whether or not to log FETCH actions.
         * @type {Boolean}
         */
        this.log = newObj.hasOwnProperty('log') ? newObj.log !== 'none' ? newObj.log : false : oldObj.log;
    }
}

/**
 * The default client options.
 * @property {String} token The API token, required for some actions.
 * @property {String} botID The Bot ID, needed for "self" actions and to set guild count.
 * @property {Object} client The discord.js#Client object.
 * @property {Boolean} log Whether or not to log FETCH actions.
 * @static
 */
ClientOptions.default = { token: 'none', botID: 'none', client: 'none', log: false };

exports.ClientOptions = ClientOptions;
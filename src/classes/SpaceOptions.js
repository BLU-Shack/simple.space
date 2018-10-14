/**
 * Options that are supplied during initialization.
 * @typedef {Object} SpaceOptions
 */
class SpaceOptions {
    /**
     * @param {ObjectConstructor} newObj Old Object.
     * @param {ObjectConstructor} [oldObj=SpaceOptions.default] New Object.
     * @property {String} [token='none'] The API token, required for some tasks.
     * @property {String} [botID='none'] The bot ID, used for "self" actions.
     * @property {Object} [client='none'] The discord.js#Client object.
     * @property {Boolean} [log=false] Whether or not to console log POST actions.
     */
    constructor(newObj, oldObj = SpaceOptions.default) {
        this.token = newObj.hasOwnProperty('token') ? newObj.token !== 'none' ? newObj.token : false : oldObj.token;

        this.client = newObj.hasOwnProperty('client') ? newObj.client !== 'none' ? newObj.client : false : oldObj.token;

        this.botID = newObj.hasOwnProperty('botID') ? newObj.botID !== 'none' ? newObj.botID : false : oldObj.botID;

        this.log = newObj.hasOwnProperty('log') ? newObj.log !== 'none' ? newObj.log : false : oldObj.log;
    }
}

/**
 * The default parameters for SpaceOptions.
 * @property {String} token The API token, required for some actions.
 * @property {String} botID The bot ID, used for "self" actions.
 * @property {Object} client The discord.js#Client object.
 * @property {Boolean} log Whether or not to log POST actions.
 * @static
 */
SpaceOptions.default = { token: 'none', botID: 'none', client: 'none', log: false };

module.exports = SpaceOptions;
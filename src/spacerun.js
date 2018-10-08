const snekfetch = require('snekfetch');
const apiLink = 'https://botlist.space/api';

class BLSpaceAPI {
    static get link() {
        return apiLink;
    }
    /**
     * Initializes the wrapper.
     * @param {String=} token The API token from the site. Required for a few functions. If you do not need to use this, use 'none'
     * @param {String=} id The bot ID from the site. Used for self functions. If unneeded, use 'none'
     * @param {Object=} client The client object. Used for setting post count if you do not want to provide a value in setCount. If unneeded, use undefined.
     * @param {Boolean=} log If you want to log POST actions into the console.
     */
    constructor(token = 'none', id = 'none', client = 'none', log = false) {
        if ([token, id].some(v => typeof v !== 'string')) throw new TypeError('Both the API token and the BotID must be a string.');
        if (typeof log !== 'boolean') throw new TypeError('log must be a boolean value. (true OR false)');
        this.token = token === 'none' ? false : token;
        this.id = id === 'none' ? false : id;
        this.client = client ? client : false;
        this.log = log;
    }
    /**
     * Post your server count onto the site.
     * @param {Number|Array<Number>=} serverSize Post your guild count/shards array to the site. If a client is supplied during initialization, this is unnecessary, unless you are sharding. Supplying a value overrides the autofill.
     * @returns {Promise<Object>} Returns the code, success (boolean), and a message.
     */
    setCount(serverSize) {
        if (!this.token || this.token === 'none') throw new ReferenceError('To post your server count, you must supply an API token on initialization.');
        if (!serverSize && !this.client) throw new ReferenceError('You must either supply a value for serverSize, or provide a client object on initialization.');
        if (this.client && !serverSize) serverSize = this.client.guilds.size;
        if (typeof serverSize !== 'number' && !(serverSize instanceof Array)) throw new TypeError('serverSize must be either a number or an array of numbers.');
        return new Promise((resolve, reject) => {
            const data = serverSize instanceof Array ? { shards: serverSize } : { server_count: serverSize };
            snekfetch.post(`${apiLink}/bots/${this.id}`)
                .send(data)
                .set({ Authorization: this.token, 'Content-Type': 'application/json' })
                .then(body => {
                    if (this.log) console.log(`Successfully posted server count, at ${serverSize} guilds.`);
                    resolve(body.body);
                })
                .catch(reject);
        });
    }
    /**
     * Fetch a bot from the site.
     * @param {String} botID The bot ID to fetch from the list.
     * @param {String=} specified Supply if you want to get a specific value, etc. 'prefix'
     * @returns {Promise<*>} Returns the bot contents/specified item.
     */
    fetchBot(botID, specified) {
        if (!botID) throw new ReferenceError('botID must be present.');
        if (typeof botID !== 'string') throw new TypeError('botID must be a string.');
        if (botID.length !== 18) throw new SyntaxError('botID must have 18 as the length.');
        return new Promise((resolve, reject) => {
            snekfetch.get(`${apiLink}/bots/${botID}`)
                .then(bot => {
                    resolve(specified ? bot.body[specified] : bot.body);
                })
                .catch(reject);
        });
    }
    /**
     * Fetch a bot using the ID supplied on initialization.
     * @param {String} specified Supply if you want to get a specific value, etc. 'prefix'
     * @returns {Promise<*>} Returns the bot contents/specified item.
     */
    fetchSelf(specified) {
        return new Promise((resolve, reject) => {
            this.fetchBot(this.id, specified ? specified : undefined)
                .then(resolve)
                .catch(reject);
        });
    }
    /**
     * Fetch the site statistics.
     * @param {String} specified Supply if you want a specific value, etc. 'servers' or 'bots'
     * @returns {Promise<*>} Returns site stats/specified value.
     */
    fetchStats(specified) {
        return new Promise((resolve, reject) => {
            snekfetch.get(`${apiLink}/stats`)
                .then(stats => {
                    resolve(specified ? stats.body[specified] : stats.body);
                })
                .catch(reject);
        });
    }
}

module.exports = BLSpaceAPI;
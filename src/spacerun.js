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
    constructor(token = 'none', id = 'none', client = false, log = false) {
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
     * @returns {Promise<String>|Promise<Number>|Promise<Array<Object>>} Returns the bot contents/specified item.
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
     * @param {String=} specified Supply if you want to get a specific value, etc. 'prefix'
     * @returns {Promise<Object>|Promise<String>|Promise<Number>|Promise<Array<Object>>} Returns the bot contents/specified item.
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
     * @param {String=} specified Supply if you want a specific value, etc. 'servers' or 'bots'
     * @returns {Promise<Object>|Promise<Number>} Returns site stats/specified value.
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
    /**
     * Fetches a user that had logged on to botlist.space
     * @param {String} userID The user ID to fetch.
     * @param {String} specified Supply if you want a specific value, etc. 'username' or 'short_description'
     * @returns {Promise<Object>|Promise<String>|Promise<Number>|Promise<Array<Object>>} Returns user object/specified value.
     */
    fetchUser(userID, specified) {
        if (!userID) throw new ReferenceError('userID must be supplied.');
        if (typeof userID !== 'string') throw new TypeError('userID must be a string.');
        if (userID.length !== 18) throw new SyntaxError('A user ID must have a length of 18.');
        return new Promise((resolve, reject) => {
            snekfetch.get(`${apiLink}/users/${userID}`)
                .then(user => {
                    resolve(specified ? user.body[specified] : user.body);
                })
                .catch(reject);
        });
    }
    /**
     * Fetch a bot's upvotes from the past 24 hours.
     * @param {String} botID The bot ID to fetch upvotes from.
     * @param {Boolean=} ids Whether or not to output an array of user IDs instead of user objects.
     * @returns {Promise<Array<*>>} The array of the bot objects.
     */
    fetchUpvotes(botID, ids = false) {
        if (!this.token || this.token === 'none') throw new ReferenceError('A token must have been supplied during initialization.');
        if (!botID) throw new ReferenceError('botID must be supplied.');
        if (typeof botID !== 'string') throw new TypeError('botID must be a string.');
        if (botID.length !== 18) throw new SyntaxError('A bot ID must have a length of 18.');
        if (typeof ids !== 'boolean') throw new TypeError('ids must be a boolean value. (true or false)');
        return new Promise((resolve, reject) => {
            snekfetch.get(`${apiLink}/bots/${botID}/upvotes?ids=${ids}`)
                .set({ Authorization: this.token })
                .then(upvotes => {
                    resolve(upvotes.body);
                })
                .catch(reject);
        });
    }
    /**
     * Fetch your bot's upvotes from the past 24 hours.
     * @param {Boolean=} ids Whether or not to output an array of user IDs instead of user objects.
     * @returns {Promise<Array<*>>} The array of the bot objects.
     */
    fetchUpvotesSelf(ids = false) {
        if (typeof ids !== 'boolean') throw new TypeError('ids must be a boolean value. (true or false)');
        return new Promise((resolve, reject) => {
            this.fetchUpvotes(this.id, ids)
                .then(resolve)
                .catch(reject);
        });
    }
}

module.exports = BLSpaceAPI;
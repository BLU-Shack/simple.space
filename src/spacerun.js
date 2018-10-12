const snekfetch = require('snekfetch');
const util = require('util');
const apiLink = 'https://botlist.space/api';

class BLSpaceAPI {
    static get link() {
        return apiLink;
    }
    /**
     * Initializes the wrapper.
     * @param {String=} token The API token from the site. Required for a few functions. If you do not need to use this, use 'none'
     * @param {String=} botID The bot ID from the site. Used for self functions. If unneeded, use 'none'
     * @param {Object=} client The client object. Used for setting post count if you do not want to provide a value in setCount. If unneeded, use undefined.
     * @param {Boolean=} log If you want to log POST actions into the console.
     */
    constructor(token = 'none', botID = 'none', client = false, log = false) {
        if ([token, botID].some(v => typeof v !== 'string')) throw new TypeError('Both the API token and the BotID must be a string.');
        if (typeof log !== 'boolean') throw new TypeError('log must be a boolean value. (true OR false)');
        this.token = token === 'none' ? false : token;
        this.botID = botID === 'none' ? false : botID;
        this.client = client ? client : false;
        this.log = log;
    }
    /**
     * Post your guild count onto the site.
     * @deprecated Use setGuilds() instead.
     * @param {Number|Array<Number>=} guildSize Post your guild count/array of numbers to the site. If a client is supplied during initialization, this is unnecessary, unless you are sharding. Supplying a value overrides the autofill.
     * @returns {Promise<Object>} Returns the code, success (boolean), and a message.
     */
    setCount(guildSize) {
        return new Promise((resolve, reject) => {
            this.setGuilds(guildSize)
                .then(resolve)
                .catch(reject);
        });
    }
    /**
     * Post your guild count onto the site.
     * @param {Number|Array<Number>=} guildSize Post your guild count/array of numbers to the site. If a client is supplied during initialization, this is unnecessary, unless you are sharding. Supplying a value overrides the autofill.
     * @returns {Promise<Object>} Returns the code, success (boolean), and a message.
     */
    setGuilds(guildSize) {
        if (!this.token || this.token === 'none') throw new ReferenceError('To post your guild count, you must supply an API token on initialization.');
        if (!guildSize && !this.client) throw new ReferenceError('You must either supply a value for guildSize, or provide a client object on initialization.');
        if (this.client && !guildSize) guildSize = this.client.guilds.size;
        if (typeof guildSize !== 'number' && !(guildSize instanceof Array)) throw new TypeError('guildSize must be either a number or an array of numbers.');
        return new Promise((resolve, reject) => {
            const data = guildSize instanceof Array ? { shards: guildSize } : { guild_count: guildSize };
            snekfetch.post(`${apiLink}/bots/${this.botID}`)
                .send(data)
                .set({ Authorization: this.token, 'Content-Type': 'application/json' })
                .then(body => {
                    if (this.log) console.log(`Successfully posted guild count, at ${guildSize} guilds.`);
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
     * @returns {Promise<*>} Returns the bot contents/specified item.
     */
    fetchSelf(specified) {
        return new Promise((resolve, reject) => {
            this.fetchBot(this.botID, specified ? specified : undefined)
                .then(resolve)
                .catch(reject);
        });
    }
    /**
     * Fetch the site statistics.
     * @param {String=} specified Supply if you want a specific value, etc. 'guilds' or 'bots'
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
    /**
     * Fetches a user that had logged on to botlist.space
     * @param {String} userID The user ID to fetch.
     * @param {String} specified Supply if you want a specific value, etc. 'username' or 'short_description'
     * @returns {Promise<*>} Returns user object/specified value.
     */
    fetchUser(userID, specified) {
        if (!userID) throw new ReferenceError('userID must be supplied.');
        if (typeof userID !== 'string') throw new TypeError('userID must be a string.');
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
     * @returns {Promise<Array<*>>} The array of the users who had upvoted within the past 24 hours.
     */
    fetchUpvotesSelf(ids = false) {
        if (typeof ids !== 'boolean') throw new TypeError('ids must be a boolean value. (true or false)');
        return new Promise((resolve, reject) => {
            this.fetchUpvotes(this.botID, ids)
                .then(resolve)
                .catch(reject);
        });
    }
    /**
     * Fetches all bots that had been logged on to the site.
     * @param {String} kind Whether or not to get bots or guilds (supply "servers").
     * @param {String=} specified What you want specifically from the array of the kind.
     * @returns {Promise<Array<*>>} The array of the bot objects.
     */
    fetchAll(kind, specified) {
        if (!kind) throw new ReferenceError('kind must be defined.');
        if (typeof kind !== 'string') throw new TypeError('kind must be a string.');
        if (!['bots', 'servers'].some(type => kind.toLowerCase() === type)) throw new SyntaxError('kind must be either bots or servers.');
        return new Promise((resolve, reject) => {
            snekfetch.get(`${apiLink}/${kind}`)
                .then(everything => {
                    resolve(specified ? everything.body.map(bot => bot[specified]) : everything.body);
                })
                .catch(reject);
        });
    }
    /**
     * Edit a key-value pair in the instance.
     * @param {String} key The key value to change, etc. 'token', 'botID', 'client', 'log'.
     * @param {*} value The value to change key into.
     * @returns {this} Returns itself.
     */
    edit(key, value) {
        if (!key || !value) throw new ReferenceError('Both key and value must be present.');
        if (!['token', 'botID', 'client', 'log'].some(valid => key === valid)) throw new ReferenceError('That key is non-existant.');
        if (['token', 'botID'].some(valid => key === valid) && typeof value !== 'string') throw new TypeError(`${key} must be a string.`);
        if (key === 'log' && typeof value !== 'boolean') throw new TypeError(`${key} must be a boolean value.`);
        this[key] = value === 'none' ? false : value;
        return this;
    }
    /**
     * Fetch a guild on the list.
     * @param {String} guildID The guild ID to fetch from the list.
     * @param {String=} specified Supply if you want to get a specific value, etc. 'prefix'
     * @returns {Promise<Object>} Returns the guild object.
     */
    fetchGuild(guildID, specified) {
        if (!guildID) throw new ReferenceError('guildID must be supplied.');
        if (typeof guildID !== 'string') throw new TypeError('guildID must be a string.');
        return new Promise((resolve, reject) => {
            snekfetch.get(`${apiLink}/servers/${guildID}`)
                .then(guild => {
                    resolve(specified ? guild.body[specified] : guild.body);
                })
                .catch(reject);
        });
    }
}

BLSpaceAPI.prototype.setCount = util.deprecate(BLSpaceAPI.prototype.setCount, 'BLSpaceAPI#setCount() is now deprecated. Use BLSpaceAPI#setGuilds() instead.');

module.exports = BLSpaceAPI;
const snekfetch = require('snekfetch');
const Classes = require('./classes/Classes');
const util = require('util'); // eslint-disable-line no-unused-vars
const apiLink = 'https://botlist.space/api';
const SpaceOptions = Classes.SpaceOptions;
const Bot = Classes.Bot;
const Guild = Classes.Guild;
const User = Classes.User;
const FetchOptions = Classes.FetchOptions;

class BLSpaceAPI {
    static get link() {
        return apiLink;
    }

    static get Classes() {
        return Classes;
    }
    /**
     * @param {SpaceOptions} options The configuration options.
     */
    constructor(options = {}) {
        if ((options) !== Object(options) || options instanceof Array) throw new TypeError('options must be an object.');

        if (options.token && typeof options.token !== 'string') throw new TypeError('token must be a string.');

        if (options.botID && typeof options.botID !== 'string') throw new TypeError('botID must be a string.');

        if (options.log && typeof options.log !== 'boolean') throw new TypeError('log must be a boolean value.');

        const Space = new SpaceOptions(options, { token: false, botID: false, client: false, log: false });

        this.token = Space.token;

        this.botID = Space.botID;

        this.client = Space.client;

        this.log = Space.log;
    }
    /**
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
     * @param {FetchOptions=} options FetchOptions.
     * @returns {Promise<Bot>} Returns the bot contents/specified item.
     */
    fetchBot(botID, options = {}) {
        if (!botID) throw new ReferenceError('botID must be present.');
        if (typeof botID !== 'string') throw new TypeError('botID must be a string.');
        if (options !== Object(options) || options instanceof Array) throw new TypeError('options must be an object.');
        return new Promise((resolve, reject) => {
            snekfetch.get(`${apiLink}/bots/${botID}`)
                .then(bot => {
                    const Options = new FetchOptions(options);
                    if (Options.normal) {
                        resolve(Options.specified ? bot.body[Options.specified] : bot.body);
                    } else {
                        const SpaceBot = new Bot(bot.body);
                        resolve(Options.specified ? SpaceBot[Options.specified] : SpaceBot);
                    }
                })
                .catch(reject);
        });
    }
    /**
     * Fetch a bot using the ID supplied on initialization.
     * @param {FetchOptions=} options Options.
     * @returns {Promise<Bot>} Returns the bot contents/specified item.
     */
    fetchSelf(options = {}) {
        return new Promise((resolve, reject) => {
            this.fetchBot(this.botID, options)
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
     * @param {FetchOptions=} options FetchOptions.
     * @returns {Promise<User>} Returns user object/specified value.
     */
    fetchUser(userID, options = {}) {
        if (!userID) throw new ReferenceError('userID must be supplied.');
        if (typeof userID !== 'string') throw new TypeError('userID must be a string.');
        if (options !== Object(options) || options instanceof Array) throw new TypeError('options must be an object.');
        return new Promise((resolve, reject) => {
            snekfetch.get(`${apiLink}/users/${userID}`)
                .then(user => {
                    const Options = new FetchOptions(options);
                    if (Options.normal) {
                        resolve(Options.specified ? user.body[Options.specified] : user.body);
                    } else {
                        const SpaceUser = new User(user.body);
                        resolve(Options.specified ? SpaceUser[Options.specified] : SpaceUser);
                    }
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
     * @param {String} kind Whether or not to get bots or guilds.
     * @param {FetchOptions=} options What you want specifically from the array of the kind.
     * @returns {Promise<Array<Bot|Guild>>} The array of the bot objects.
     */
    fetchAll(kind, options = {}) {
        if (!kind) throw new ReferenceError('kind must be defined.');
        if (typeof kind !== 'string') throw new TypeError('kind must be a string.');
        if (options !== Object(options) || options instanceof Array) throw new TypeError('options must be an object.');
        if (!['bots', 'guilds', 'servers'].some(type => kind.toLowerCase() === type)) throw new SyntaxError('kind must be either bots or guilds.');
        if (kind === 'servers') {
            process.emitWarning('fetchAll() => Pass "guilds" instead of "servers".', 'DeprecationWarning');
            kind = 'guilds';
        }
        return new Promise((resolve, reject) => {
            if (kind === 'bots') {
                const Options = new FetchOptions(options);
                snekfetch.get(`${apiLink}/bots`)
                    .then(bots => {
                        if (Options.normal) {
                            resolve(Options.specified ? bots.body.map(bot => bot[Options.specified]) : bots.body);
                        } else {
                            const Bots = bots.body.map(bot => new Bot(bot));
                            resolve(Options.specified ? Bots.map(bot => bot[Options.specified]) : Bots);
                        }
                    })
                    .catch(reject);
            } else {
                const Options = new FetchOptions(options);
                snekfetch.get(`${apiLink}/servers`)
                    .then(guilds => {
                        if (Options.normal) {
                            resolve(Options.specified ? guilds.body.map(guild => guild[Options.specified]) : guilds.body);
                        } else {
                            const Guilds = guilds.body.map(bot => new Guild(bot));
                            resolve(Options.specified ? Guilds.map(bot => bot[Options.specified]) : Guilds);
                        }
                    })
                    .catch(reject);
            }
        });

    }
    /**
     * Edit a key-value pair in the instance.
     * @param {SpaceOptions} options A thing.
     * @returns {this} Returns itself for edit chains.
     */
    edit(options) {
        if (!options) throw new ReferenceError('options must be defined.');

        if ((options) !== Object(options) || options instanceof Array) throw new TypeError('options must be an object.');

        if (options.token && typeof options.token !== 'string') throw new TypeError('token must be a string.');

        if (options.botID && typeof options.botID !== 'string') throw new TypeError('botID must be a string.');

        if (options.log && typeof options.log !== 'boolean') throw new TypeError('log must be a boolean value.');

        const Space = new SpaceOptions(options, this);

        this.token = Space.token;

        this.botID = Space.botID;

        this.client = Space.client;

        this.log = Space.log;

        return this;
    }
    /**
     * Fetch a guild on the list.
     * @param {String} guildID The guild ID to fetch from the list.
     * @param {FetchOptions=} options Supply if you want to get a specific value, etc. 'prefix'
     * @returns {Promise<Guild>} Returns the guild object.
     */
    fetchGuild(guildID, options = {}) {
        if (!guildID) throw new ReferenceError('guildID must be supplied.');
        if (typeof guildID !== 'string') throw new TypeError('guildID must be a string.');
        if (options !== Object(options) || options instanceof Array) throw new TypeError('options must be an object.');
        return new Promise((resolve, reject) => {
            snekfetch.get(`${apiLink}/servers/${guildID}`)
                .then(guild => {
                    const Options = new FetchOptions(options);
                    if (Options.normal) {
                        resolve(Options.specified ? guild.body[Options.specified] : guild.body);
                    } else {
                        const SpaceGuild = new Guild(guild.body);
                        resolve(Options.specified ? SpaceGuild[Options.specified] : SpaceGuild);
                    }
                })
                .catch(reject);
        });
    }
}

module.exports = BLSpaceAPI;
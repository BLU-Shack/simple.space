const Fetch = require('node-fetch');
const util = require('util'); // eslint-disable-line no-unused-vars
const ClientOptions = require('./structures/ClientOptions.js').ClientOptions;
const Bot = require('./structures/Bot.js').Bot;
const Guild = require('./structures/Guild.js').Guild;
const User = require('./structures/User.js').User;
const FetchError = require('./structures/FetchError.js').FetchError;
const FetchOptions = require('./structures/FetchOptions').FetchOptions;
const Stats = require('./structures/Stats').Stats;
const PartialUser = require('./structures/PartialUser.js').PartialUser;
const PostOptions = require('./structures/PostOptions').PostOptions;
const UpvoteFetchOptions = require('./structures/UpvoteFetchOptions.js').UpvoteFetchOptions;

const endpoint = 'https://botlist.space/api';

/**
 * Main client class for interacting to botlist.space
 * @class
 * @constructor
 */
class Client {
    /**
     * @param {ClientOptions} [options=ClientOptions.default] The configuration options.
     */
    constructor(options = ClientOptions.default) {
        /**
         * @ignore
         * @type {ClientOptions}
         */
        this.options;
        this.edit(options, true); // Note from the Developer: Do Not Touch.
    }

    /**
     * Edit at least one or more key-value pair in the instance.
     * @param {ClientOptions} [options=ClientOptions.default] A thing.
     * @param {Boolean} [preset=false] Whether or not to have preset rules when setting values.
     * @returns {this} Returns itself for edit chains.
     * @example
     * console.log(Client.edit({ log: false }).options);
     */
    edit(options = ClientOptions.default, preset = false) {
        if (!options) throw new ReferenceError('options must be defined.');
        if ((options) !== Object(options) || options instanceof Array) throw new TypeError('options must be an object.');
        if (options.token && typeof options.token !== 'string') throw new TypeError('token must be a string.');
        if (options.botID && typeof options.botID !== 'string') throw new TypeError('botID must be a string.');
        if (options.log && typeof options.log !== 'boolean') throw new TypeError('log must be a boolean value.');
        this.options = new ClientOptions(options, preset ? ClientOptions.default : this.options);

        return this;
    }

    /**
     * @param {PostOptions} [options={}] Post Options. Currently supports a number.
     * @param {String} [options.token=this.options.token] The API token for posting.
     * @param {String} [options.botID=this.options.botID] The bot ID for posting.
     * @param {String} [options.guildSize] The guild count to push.
     * @returns {Promise<Object>} Returns the code, and a message.
     */
    setGuilds(options = {}) {
        if (typeof options !== 'number' && (options !== Object(options) || options instanceof Array)) throw new TypeError('options must be an object.');
        const Options = new PostOptions(typeof options === 'number' ? { guildSize: options } : options, this.options);
        if (typeof options === 'number') process.emitWarning(`Client#setGuilds() => Pass { guildSize: ${options} }`);
        if (!Options.token) throw new ReferenceError('options.token must be defined.');
        if (!Options.botID) throw new ReferenceError('options.botID must be defined.');
        if (typeof Options.token !== 'string') throw new TypeError('options.token must be a string.');
        if (typeof Options.botID !== 'string') throw new TypeError('options.botID must be a string.');
        return new Promise((resolve, reject) => {
            const size = options.guildSize instanceof Array ? { shards: options.guildSize } : { server_count: options.guildSize };
            Fetch(`${endpoint}/bots/${Options.botID}`, { method: 'POST', headers: { Authorization: Options.token, 'Content-Type': 'application/json' }, body: JSON.stringify(size) })
                .then(async resolved => {
                    const body = await resolved.json();
                    if (body.code) throw new FetchError(body, 'Guild');
                    resolve(body);
                })
                .catch(reject);
        });
    }

    /**
     * Fetch a bot from the site.
     * @param {String} botID The bot ID to fetch from the list.
     * @param {FetchOptions} [options={}] FetchOptions.
     * @returns {Promise<Bot>} Returns the bot contents/specified item.
     * @example
     * Client.fetchBot('463803888072523797', { specified: 'username' })
     *  .then(username => console.log(username))
     *  .catch(console.log);
     */
    fetchBot(botID, options = {}) {
        if (!botID) throw new ReferenceError('botID must be present.');
        if (typeof botID !== 'string') throw new TypeError('botID must be a string.');
        if (options !== Object(options) || options instanceof Array) throw new TypeError('options must be an object.');
        return new Promise((resolve, reject) => {
            Fetch(`${endpoint}/bots/${botID}`)
                .then(async bot => {
                    const body = await bot.json();
                    if (body.code) throw new FetchError(body, 'Bot');
                    const Options = new FetchOptions(options);
                    if (Options.normal) {
                        if (this.options.log) console.log(Options.specified ? body[Options.specified] : body);
                        resolve(Options.specified ? body[Options.specified] : body);
                    } else {
                        const SpaceBot = Options.stringify ? new Bot(body).toString() : new Bot(body);
                        if (this.options.log) console.log(Options.specified ? SpaceBot[Options.specified] : SpaceBot);
                        resolve(Options.specified ? SpaceBot[Options.specified] : SpaceBot);
                    }
                })
                .catch(reject);
        });
    }

    /**
     * Fetch a bot using the ID supplied on initialization.
     * @param {FetchOptions} [options={}] Options.
     * @returns {Promise<Bot>} Returns the bot contents/specified item.
     */
    fetchSelf(options = {}) {
        return this.fetchBot(this.options.botID, options);
    }

    /**
     * Fetch a guild on the list.
     * @param {String} guildID The guild ID to fetch from the list.
     * @param {FetchOptions} [options={}] Supply if you want to get a specific value, etc. 'prefix'
     * @returns {Promise<Guild>} Returns the guild object.
     */
    fetchGuild(guildID, options = {}) {
        if (!guildID) throw new ReferenceError('guildID must be supplied.');
        if (typeof guildID !== 'string') throw new TypeError('guildID must be a string.');
        if (options !== Object(options) || options instanceof Array) throw new TypeError('options must be an object.');
        return new Promise((resolve, reject) => {
            Fetch(`${endpoint}/servers/${guildID}`)
                .then(async guild => {
                    const body = await guild.json();
                    if (body.code) throw new FetchError(body, 'Guild');
                    const Options = new FetchOptions(options);
                    if (Options.normal) {
                        if (this.options.log) console.log(Options.specified ? body[Options.specified] : body);
                        resolve(Options.specified ? body[Options.specified] : body);
                    } else {
                        const SpaceGuild = Options.stringify ? new Guild(body).toString() : new Guild(body);
                        if (this.options.log) console.log(Options.specified ? SpaceGuild[Options.specified] : SpaceGuild);
                        resolve(Options.specified ? SpaceGuild[Options.specified] : SpaceGuild);
                    }
                })
                .catch(reject);
        });
    }

    /**
     * Fetch the site statistics.
     * @param {FetchOptions} [options={}] Supply if you want a specific value, etc. 'guilds' or 'bots'
     * @returns {Promise<Stats>} Returns site stats/specified value.
     */
    fetchStats(options = {}) {
        return new Promise((resolve, reject) => {
            Fetch(`${endpoint}/stats`)
                .then(async stats => {
                    const body = await stats.json();
                    if (body.code) throw new FetchError(body, 'Stats');
                    const Options = new FetchOptions(options);
                    if (Options.normal) {
                        if (this.options.log) console.log(Options.specified ? body[Options.specified] : body);
                        resolve(Options.specified ? body[Options.specified] : body);
                    } else {
                        const SpaceStats = new Stats(body);
                        if (this.options.log) console.log(Options.specified ? SpaceStats[Options.specified] : SpaceStats);
                        resolve(Options.specified ? SpaceStats[Options.specified] : SpaceStats);
                    }
                })
                .catch(reject);
        });
    }

    /**
     * Fetches a user that had logged on to botlist.space
     * @param {String} userID The user ID to fetch.
     * @param {FetchOptions} [options={}] FetchOptions.
     * @returns {Promise<User>} Returns user object/specified value.
     */
    fetchUser(userID, options = {}) {
        if (!userID) throw new ReferenceError('userID must be supplied.');
        if (typeof userID !== 'string') throw new TypeError('userID must be a string.');
        if (options !== Object(options) || options instanceof Array) throw new TypeError('options must be an object.');
        return new Promise((resolve, reject) => {
            Fetch(`${endpoint}/users/${userID}`)
                .then(async user => {
                    const body = await user.json();
                    if (body.code) throw new FetchError(body, 'User');
                    const Options = new FetchOptions(options);
                    if (Options.normal) {
                        if (this.options.log) console.log(Options.specified ? body[Options.specified] : body);
                        resolve(Options.specified ? body[Options.specified] : body);
                    } else {
                        const SpaceUser = Options.stringify ? new User(body).toString() : new User(body);
                        if (this.options.log) console.log(Options.specified ? SpaceUser[Options.specified] : SpaceUser);
                        resolve(Options.specified ? SpaceUser[Options.specified] : SpaceUser);
                    }
                })
                .catch(reject);
        });
    }

    /**
     * Fetch users in the last 24 hours who have upvoted your bot.
     * @param {UpvoteFetchOptions} [options={}] Whether or not to output an array of user IDs instead of user objects.
     * @returns {Promise<Array<PartialUser>>} The array of the user objects/user IDs.
     * @example
     * Client.fetchUpvotes({ ids: true });
     */
    fetchUpvotes(options = {}) {
        if (options !== Object(options) || options instanceof Array) throw new TypeError('options must be an object.');
        const Options = new UpvoteFetchOptions(options);
        if (!Options.token && !this.options.token) throw new ReferenceError('options.token must either be defined in ClientOptions or in the UpvoteFetchOptions (etc. { token: \'TOKEN\', ... })');
        if (!this.options.botID) throw new ReferenceError('options.botID must be either defined in ClientOptions or in UpvoteFetchOptions (etc. { botID: \'BOT_ID\', ... }) ');
        if (typeof this.options.botID !== 'string') throw new TypeError('options.botID must be a string.');
        return new Promise((resolve, reject) => {
            Fetch(`${endpoint}/bots/${this.options.botID}/upvotes?ids=${Options.ids}`, { headers: { Authorization: this.options.token } })
                .then(async upvotes => {
                    const body = await upvotes.json();
                    if (body.code) throw new FetchError(body, 'Bot');
                    if (Options.ids) Options.specified = null;
                    if (Options.normal) {
                        if (this.options.log) console.log(Options.specified ? body.map(user => user[Options.specified]) : body);
                        resolve(Options.specified ? body.map(user => user[Options.specified]) : body);
                    } else {
                        const SpaceUpvotes = body.map(info => {
                            const obj = { timestamp: info.timestamp, user: Options.stringify ? new PartialUser(info.user).toString() : new PartialUser(info.user) };
                            return obj;
                        });
                        if (this.options.log) console.log(Options.specified ? SpaceUpvotes.map(v => v[Options.specified]) : SpaceUpvotes);
                        resolve(Options.specified ? SpaceUpvotes.map(v => v[Options.specified]) : SpaceUpvotes);
                    }
                })
                .catch(reject);
        });
    }

    /**
     * Fetches all bots that had been logged on to the site.
     * @param {String} kind Whether or not to get bots or
     * @param {FetchOptions} [options={}] What you want specifically from the array of the kind.
     * @returns {Promise<Array<Bot|Guild>>} The array of the bot objects.
     */
    fetchAll(kind, options = {}) {
        if (!kind) throw new ReferenceError('kind must be defined.');
        if (typeof kind !== 'string') throw new TypeError('kind must be a string.');
        if (options !== Object(options) || options instanceof Array) throw new TypeError('options must be an object.');
        if (!['bots', 'guilds'].some(type => kind.toLowerCase() === type)) throw new SyntaxError('kind must be either bots or ');
        return new Promise((resolve, reject) => {
            const Options = new FetchOptions(options);
            if (kind.toLowerCase() === 'bots') {
                Fetch(`${endpoint}/bots`)
                    .then(async bots => {
                        const body = await bots.json();
                        if (body.code) throw new FetchError(body, 'Bots');
                        if (Options.normal) {
                            if (this.options.log) console.log(Options.specified ? body.map(bot => bot[Options.specified]) : body);
                            resolve(Options.specified ? body.map(bot => bot[Options.specified]) : body);
                        } else {
                            const Bots = body.map(bot => new Bot(bot));
                            if (this.options.log) console.log(Options.specified ? Bots.map(bot => bot[Options.specified]) : Bots);
                            resolve(Options.specified ? Bots.map(bot => bot[Options.specified]) : Bots);
                        }
                    })
                    .catch(reject);
            } else if (kind.toLowerCase() === 'guilds') {
                Fetch(`${endpoint}/servers`)
                    .then(async guilds => {
                        const body = await guilds.json();
                        if (body.code) throw new FetchError(body, 'Guilds');
                        if (Options.normal) {
                            if (this.options.log) console.log(Options.specified ? body.map(guild => guild[Options.specified]) : body);
                            resolve(Options.specified ? body.map(guild => guild[Options.specified]) : body);
                        } else {
                            const Guilds = body.map(bot => new Guild(bot));
                            if (this.options.log) console.log(Options.specified ? Guilds.map(bot => bot[Options.specified]) : Guilds);
                            resolve(Options.specified ? Guilds.map(bot => bot[Options.specified]) : Guilds);
                        }
                    })
                    .catch(reject);
            }
        });
    }

    /**
     * All of the classes used.
     * @namespace
     * @static
     * @private
     */
    static get Classes() {
        return { Bot, ClientOptions, FetchError, FetchOptions, Guild, PostOptions, Stats, UpvoteFetchOptions, User };
    }

    /**
     * The endpoint URL, used to interact with the site.
     * @type {String}
     */
    static get endpoint() {
        return endpoint;
    }
}
module.exports = Client;
module.exports.version = 'v2.2.3';
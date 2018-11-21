const Fetch = require('node-fetch');
const util = require('util'); // eslint-disable-line no-unused-vars

const ClientOptions = require('./structures/ClientOptions.js').ClientOptions;
const FetchOptions = require('./structures/FetchOptions').FetchOptions;
const PostOptions = require('./structures/PostOptions').PostOptions;
const UpvoteFetchOptions = require('./structures/UpvoteFetchOptions.js').UpvoteFetchOptions;

const Bot = require('./structures/Bot.js').Bot;
const Emoji = require('./structures/Emoji.js').Emoji;
const Guild = require('./structures/Guild.js').Guild;
const PartialUser = require('./structures/PartialUser.js').PartialUser;
const User = require('./structures/User.js').User;

const FetchError = require('./structures/FetchError.js').FetchError;
const Stats = require('./structures/Stats.js').Stats;
const endpoint = 'https://botlist.space/api';

const Classes = { ClientOptions, FetchOptions, PostOptions, UpvoteFetchOptions, Bot, Emoji, Guild, PartialUser, User, FetchError, Stats };

/**
 * Main client class for interacting to botlist.space
 * @class
 */
class Client {
    /**
     * @param {ClientOptions} [options=ClientOptions.default] The configuration options.
     */
    constructor(options = ClientOptions.default) {
        /**
         * The Client Options.
         * @type {ClientOptions}
         */
        this.options;
        this.edit(options, true); // Note from the Developer: Do Not Touch.
    }

    /**
     * Checks whether or not a given item is an object.
     * @param {object} obj The item to testify against.
     * @returns {boolean} Whether or not the item that is testifyed is an object.
     */
    static isObject(obj) {
        return (obj === Object(obj) || obj instanceof Array);
    }

    /**
     * Edit at least one or more key-value pair in the instance.
     * @param {ClientOptions} [options=ClientOptions.default] A thing.
     * @param {boolean} [preset=false] Whether or not to have preset rules when setting values.
     * @returns {ClientOptions} The new client options.
     * @example
     * console.log(Client.edit({ log: false }).options);
     */
    edit(options = ClientOptions.default, preset = false) {
        if (!options) throw new ReferenceError('options must be defined.');
        if (!Client.isObject(options)) throw new TypeError('options must be an object.');
        if (options.token && typeof options.token !== 'string') throw new TypeError('token must be a string.');
        if (options.botID && typeof options.botID !== 'string') throw new TypeError('botID must be a string.');
        if (options.log && typeof options.log !== 'boolean') throw new TypeError('log must be a boolean value.');
        this.options = new ClientOptions(options, preset ? ClientOptions.default : this.options);

        return this.options;
    }

    /**
     * Returns all bots on the site.
     * @param {FetchOptions} options Fetch Options.
     * @returns {Promise<Bot[]>} All bots on the site.
     */
    fetchAllBots(options = {}) {
        if (!Client.isObject(options)) throw new TypeError('options must be an object.');
        const Options = new FetchOptions(options);
        return new Promise((resolve, reject) => {
            Fetch(`${endpoint}/bots`)
                .then(async body => {
                    const bots = await body.json();
                    if (bots.code) throw new FetchError(bots, 'Bots');
                    if (Options.normal) {
                        const resolved = Options.specified ? bots.map(bot => bot[Options.specified]) : bots;
                        if (this.options.log) console.log(resolved);
                        resolve(resolved);
                    } else {
                        const SpaceBots = bots.map(bot => new Bot(bot));
                        const resolved = Options.specified ? SpaceBots.map(bot => bot[Options.specified]) : SpaceBots;
                        if (this.options.log) console.log(resolved);
                        resolve(resolved);
                    }
                })
                .catch(reject);
        });
    }

    /**
     * Fetches all guilds on the site.
     * @param {FetchOptions} options Fetch Options
     * @returns {Promise<Guild[]>} All guilds on the site.
     */
    fetchAllGuilds(options = {}) {
        if (!Client.isObject(options)) throw new TypeError('options must be an object.');
        const Options = new FetchOptions(options);
        return new Promise((resolve, reject) => {
            Fetch(`${endpoint}/servers`)
                .then(async body => {
                    const guilds = await body.json();
                    if (guilds.code) throw new FetchError(guilds, 'Guilds');
                    if (Options.normal) {
                        const resolved = Options.specified ? guilds.map(guild => guild[Options.specified]) : guilds;
                        if (this.options.log) console.log(resolved);
                        resolve(resolved);
                    } else {
                        const SpaceGuilds = guilds.map(guild => new Guild(guild));
                        const resolved = Options.specified ? SpaceGuilds.map(guild => guild[Options.specified]) : SpaceGuilds;
                        if (this.options.log) console.log(resolved);
                        resolve(resolved);
                    }
                })
                .catch(reject);
        });
    }

    /**
     * Fetch all emojis listed on the site.
     * @param {FetchOptions} options Fetch Options.
     * @returns {Promise<Emoji[]>} All emojis on the site.
     */
    fetchAllEmojis(options = {}) {
        if (!Client.isObject(options)) throw new TypeError('options must be an object.');
        const Options = new FetchOptions(options);
        return new Promise((resolve, reject) => {
            Fetch(`${endpoint}/emojis`)
                .then(async body => {
                    const emojis = await body.json();
                    if (emojis.code) throw new FetchError(emojis, 'Emojis');
                    if (Options.normal) {
                        const resolved = Options.specified ? emojis.map(emoji => emoji[Options.specified]) : emojis;
                        if (this.options.log) console.log(resolved);
                        resolve(resolved);
                    } else {
                        const SpaceEmojis = emojis.map(emoji => Options.stringify ? new Emoji(emoji).toString() : new Emoji(emoji));
                        const resolved = Options.specified ? SpaceEmojis.map(emoji => emoji[Options.specified]) : SpaceEmojis;
                        if (this.options.log) console.log(resolved);
                        resolve(resolved);
                    }
                })
                .catch(reject);
        });
    }

    /**
     * Fetch a bot from the site.
     * @param {string} botID The bot ID to fetch from the list.
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
        if (!Client.isObject(options)) throw new TypeError('options must be an object.');
        return new Promise((resolve, reject) => {
            Fetch(`${endpoint}/bots/${botID}`)
                .then(async bot => {
                    const body = await bot.json();
                    if (body.code) throw new FetchError(body, 'Bot');
                    const Options = new FetchOptions(options);
                    if (Options.normal) {
                        const resolved = Options.specified ? body[Options.specified] : body;
                        if (this.options.log) console.log(resolved);
                        resolve(resolved);
                    } else {
                        const SpaceBot = Options.stringify ? new Bot(body).toString() : new Bot(body);
                        const resolved = Options.specified ? SpaceBot[options.specified] : SpaceBot;
                        if (this.options.log) console.log(resolved);
                        resolve(resolved);
                    }
                })
                .catch(reject);
        });
    }

    /**
     * Fetch an emoji listed on the site.
     * @param {string} emojiID The emoji ID to fetch.
     * @param {FetchOptions} options Fetch Options.
     * @returns {Promise<Emoji>}
     */
    fetchEmoji(emojiID, options = {}) {
        if (!emojiID) throw new ReferenceError('emojiID must be defined.');
        if (typeof emojiID !== 'string') throw new TypeError('emojiID must be a string.');
        if (!Client.isObject(options)) throw new TypeError('options must be an object.');
        const Options = new FetchOptions(options);
        return new Promise((resolve, reject) => {
            Fetch(`${endpoint}/emojis/${emojiID}`)
                .then(async body => {
                    const emoji = await body.json();
                    if (emoji.code) throw new FetchError(emoji, 'Emoji');
                    if (Options.normal) {
                        const resolved = Options.specified ? emoji[Options.specified] : emoji;
                        if (this.options.log) console.log(resolved);
                        resolve(resolved);
                    } else {
                        const SpaceEmoji = Options.stringify ? new Emoji(emoji).toString() : new Emoji(emoji);
                        const resolved = Options.specified ? SpaceEmoji[Options.specified] : SpaceEmoji;
                        if (this.options.log) console.log(resolved);
                        resolve(resolved);
                    }
                })
                .catch(reject);
        });
    }

    /**
     * Fetch a guild on the list.
     * @param {string} guildID The guild ID to fetch from the list.
     * @param {FetchOptions} [options={}] Supply if you want to get a specific value, etc. 'prefix'
     * @returns {Promise<Guild>} Returns the guild object.
     */
    fetchGuild(guildID, options = {}) {
        if (!guildID) throw new ReferenceError('guildID must be supplied.');
        if (typeof guildID !== 'string') throw new TypeError('guildID must be a string.');
        if (!Client.isObject(options)) throw new TypeError('options must be an object.');
        return new Promise((resolve, reject) => {
            Fetch(`${endpoint}/servers/${guildID}`)
                .then(async guild => {
                    const body = await guild.json();
                    if (body.code) throw new FetchError(body, 'Guild');
                    const Options = new FetchOptions(options);
                    if (Options.normal) {
                        const resolved = Options.specified ? body[Options.specified] : body;
                        if (this.options.log) console.log(resolved);
                        resolve(resolved);
                    } else {
                        const SpaceGuild = Options.stringify ? new Guild(body).toString() : new Guild(body);
                        const resolved = Options.specified ? SpaceGuild[Options.specified] : SpaceGuild;
                        if (this.options.log) console.log(resolved);
                        resolve(resolved);
                    }
                })
                .catch(reject);
        });
    }

    /**
     * Fetches a guild's emojis.
     * @param {string} guildID The guild ID to fetch its emojis from.
     * @param {FetchOptions} options Fetch Options.
     * @returns {Promise<Emoji[]>} The array of the guild's emojis.
     */
    fetchGuildEmojis(guildID, options = {}) {
        if (!guildID) throw new ReferenceError('guildID must be supplied.');
        if (typeof guildID !== 'string') throw new TypeError('guildID must be a string.');
        if (!Client.isObject(options)) throw new TypeError('options must be an object.');
        const Options = new FetchOptions(options);
        return new Promise((resolve, reject) => {
            Fetch(`${endpoint}/servers/${guildID}/emojis`)
                .then(async body => {
                    const emojis = await body.json();
                    if (emojis.code) throw new FetchError(emojis, 'Guild');
                    if (Options.normal) {
                        const resolved = Options.specified ? emojis[Options.specified] : emojis;
                        if (this.options.log) console.log(resolved);
                        resolve(resolved);
                    } else {
                        const SpaceEmojis = emojis.map(emoji => Options.stringify ? new Emoji(emoji).toString() : new Emoji(emoji));
                        const resolved = Options.specified ? SpaceEmojis.map(emoji => emoji[Options.specified]) : SpaceEmojis;
                        if (this.options.log) console.log(resolved);
                        resolve(resolved);
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
                        const resolved = Options.specified ? body[Options.specified] || body.bots[Options.specified] : body;
                        if (this.options.log) console.log(resolved);
                        resolve(resolved);
                    } else {
                        const SpaceStats = new Stats(body);
                        const resolved = Options.specified ? SpaceStats[Options.specified] || SpaceStats.bots[Options.specified] : SpaceStats;
                        if (this.options.log) console.log(resolved);
                        resolve(resolved);
                    }
                })
                .catch(reject);
        });
    }

    /**
     * Fetch users in the last 24 hours who have upvoted your bot.
     * @param {UpvoteFetchOptions} [options={}] Upvote Fetch Options.
     * @returns {Promise<PartialUser[]>} The array of the user objects/user IDs.
     * @example
     * Client.fetchUpvotes({ ids: true });
     */
    fetchUpvotes(options = {}) {
        if (!Client.isObject(options)) throw new TypeError('options must be an object.');
        const Options = new UpvoteFetchOptions(options);
        if (!Options.token && !this.options.token) throw new ReferenceError('options.token must either be defined in ClientOptions or in the UpvoteFetchOptions (etc. { token: \'TOKEN\', ... })');
        if (!this.options.botID) throw new ReferenceError('options.botID must be either defined in ClientOptions or in UpvoteFetchOptions (etc. { botID: \'BOT_ID\', ... }) ');
        if (typeof this.options.botID !== 'string') throw new TypeError('options.botID must be a string.');
        return new Promise((resolve, reject) => {
            Fetch(`${endpoint}/bots/${this.options.botID}/upvotes?ids=${Options.ids}`, { headers: { Authorization: this.options.token } })
                .then(async upvotes => {
                    const body = await upvotes.json();
                    if (body.code) throw new FetchError(body, 'Bot');
                    if (Options.normal) {
                        const resolved = Options.specified ? body.map(user => user[Options.specified]) : body;
                        if (this.options.log) console.log(resolved);
                        resolve(resolved);
                    } else {
                        const SpaceUpvotes = body.map(info => {
                            const obj = { timestamp: info.timestamp, user: Options.stringify ? new PartialUser(info.user).toString() : new PartialUser(info.user) };
                            return obj;
                        });
                        const resolved = Options.specified ? SpaceUpvotes.map(v => v[Options.specified] || v.user[Options.specified]) : SpaceUpvotes;
                        if (this.options.log) console.log(resolved);
                        resolve(resolved);
                    }
                })
                .catch(reject);
        });
    }

    /**
     * Fetches a user that had logged on to botlist.space
     * @param {string} userID The user ID to fetch.
     * @param {FetchOptions} [options={}] FetchOptions.
     * @returns {Promise<User>} Returns user object/specified value.
     */
    fetchUser(userID, options = {}) {
        if (!userID) throw new ReferenceError('userID must be supplied.');
        if (typeof userID !== 'string') throw new TypeError('userID must be a string.');
        if (!Client.isObject(options)) throw new TypeError('options must be an object.');
        return new Promise((resolve, reject) => {
            Fetch(`${endpoint}/users/${userID}`)
                .then(async user => {
                    const body = await user.json();
                    if (body.code) throw new FetchError(body, 'User');
                    const Options = new FetchOptions(options);
                    if (Options.normal) {
                        const resolved = Options.specified ? body[Options.specified] : body;
                        if (this.options.log) console.log(resolved);
                        resolve(resolved);
                    } else {
                        const SpaceUser = Options.stringify ? new User(body).toString() : new User(body);
                        const resolved = Options.specified ? SpaceUser[Options.specified] : SpaceUser;
                        if (this.options.log) console.log(resolved);
                        resolve(resolved);
                    }
                })
                .catch(reject);
        });
    }

    /**
     * Checks if a user has upvoted your bot.
     * @param {string} userID The user ID to check if they have upvoted your bot.
     * @returns {Promise<boolean>} Whether or not the user has upvoted your bot.
     */
    hasUpvoted(userID) {
        return new Promise((resolve, reject) => {
            this.fetchUpvotes({ ids: true, normal: true })
                .then(users => {
                    if (this.options.log) console.log(users.includes(userID));
                    resolve(users.includes(userID));
                })
                .catch(reject);
        });
    }

    /**
     * @param {PostOptions} [options] Post Options.
     * @param {string} [options.token=this.options.token] The API token for posting.
     * @param {string} [options.botID=this.options.botID] The bot ID for posting.
     * @param {string} [options.guildSize] The number (if no shards)/an array of numbers (if shards) to push to the API. Unneeded if a client was supplied.
     * @returns {Promise<Object>} Returns the code, and a message.
     */
    setGuilds(options = {}) {
        if (!Client.isObject(options)) throw new TypeError('options must be an object.');
        const Options = new PostOptions(options, this.options);
        return new Promise((resolve, reject) => {
            Fetch(`${endpoint}/bots/${Options.botID}`, { method: 'POST', headers: { Authorization: Options.token, 'Content-Type': 'application/json; charset=UTF-8' }, body: Options.data })
                .then(async resolved => {
                    const body = await resolved.json();
                    if (body.code) throw new FetchError(body, 'Bot');
                    resolve(body);
                })
                .catch(reject);
        });
    }

    /**
     * All of the classes used.
     * @type {Classes}
     * @static
     * @private
     */
    static get Classes() {
        return Classes;
    }

    /**
     * The endpoint URL, used to interact with the site.
     * @type {string}
     */
    static get endpoint() {
        return endpoint;
    }
}

module.exports = Client;
module.exports.version = 'v2.2.3';
const EventEmitter = require('events');
const Fetch = require('node-fetch');
const util = require('util'); // eslint-disable-line no-unused-vars

const Classes = require('./structures/Classes.js').Classes;
const ClientOptions = Classes.ClientOptions;
const FetchOptions = Classes.FetchOptions;
const PostOptions = Classes.PostOptions;
const UpvoteFetchOptions = Classes.UpvoteFetchOptions;

const Bot = Classes.Bot;
const Emoji = Classes.Emoji;
const Guild = Classes.Guild;
const UpvoteUser = Classes.UpvoteUser;
const User = Classes.User;

const FetchError = Classes.FetchError;
const Stats = Classes.Stats;
const Store = Classes.Store;
const endpoint = 'https://botlist.space/api';

/**
 * Main client class for interacting to botlist.space
 * @class
 * @extends {EventEmitter}
 */
class Client extends EventEmitter {
    /**
     * @param {ClientOptions} [options=ClientOptions.default] The configuration options.
     */
    constructor(options = ClientOptions.default) {
        super();

        /**
         * The Client Options.
         * @type {ClientOptions}
         */
        this.options;

        /**
         * Cached bots that are listed on the site, mapped through bot IDs.
         * @type {Store}
         */
        this.bots = new Store();

        /**
         * Cached emojis that are listed on the site, mapped through emoji IDs.
         * @type {Store}
         */
        this.emojis = new Store();

        /**
         * Cached guilds that are listed on the site, mapped through guild IDs.
         * @type {Store}
         */
        this.guilds = new Store();

        this.edit(options, true); // Note from the Developer: Do Not Touch.
        this._runCache(this.options.cache)
            .then(e => this.emit('ready', e))
            .catch(console.error);

        /**
         * Date when Client was initially ready.
         * @type {?Date}
         */
        this.readyAt = null;

        this.once('ready', () => { this.readyAt = new Date(); });
    }

    /**
     * The timestamp when Client was initially ready.
     * @readonly
     * @type {?number}
     */
    get readyTimestamp() {
        return this.readyAt ? this.readyAt.getTime() : null;
    }

    /**
     * Runs the automatic cache if this.options.cache is set to true.
     * @private
     * @returns {Promise<object>} Updated/normal data i gues.
     * @fires Client#cacheUpdate
     */
    async _runCache() {
        if (this.options.cache) {
            await Promise.all([this.fetchAllBots({ log: false }), this.fetchAllEmojis({ log: false }), this.fetchAllGuilds({ log: false })]);
            if (this.options.cacheUpdateTimer > 0) setTimeout(() => { this._runCache(); }, this.options.cacheUpdateTimer);
            this.emit('cacheUpdateAll', { bots: this.bots, emojis: this.emojis, guilds: this.guilds });

            return { bots: this.bots, emojis: this.emojis, guilds: this.guilds };
        } else {
            return { bots: this.bots, emojis: this.emojis, guilds: this.guilds };
        }
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
     * @example console.log(Client.edit({ log: false }).options); // { log: false, ... }
     */
    edit(options = ClientOptions.default, preset = false) {
        if (!options) throw new ReferenceError('options must be defined.');
        if (!Client.isObject(options)) throw new TypeError('options must be an object.');
        const Options = new ClientOptions(options, preset ? ClientOptions.default : this.options);
        if (Options.token && typeof Options.token !== 'string') throw new TypeError('options.token must be a string.');
        if (Options.botID && typeof Options.botID !== 'string') throw new TypeError('options.botID must be a string.');
        if (typeof Options.log !== 'boolean') throw new TypeError('options.log must be boolean.');
        if (typeof Options.cache !== 'boolean') throw new TypeError('options.cache must be boolean.');
        if (typeof Options.cacheUpdateTimer !== 'number') throw new TypeError('options.cacheUpdateTimer must be a number.');
        this.options = Options;

        return this.options;
    }

    /**
     * Returns all bots on the site.
     * @param {FetchOptions} [options={}] Fetch Options.
     * @returns {Promise<Bot[]>} All bots on the site.
     */
    fetchAllBots(options = {}) {
        if (!Client.isObject(options)) throw new TypeError('options must be an object.');
        const { normal, specified, log, stringify } = new FetchOptions(options, this.options);
        return new Promise((resolve, reject) => {
            Fetch(`${endpoint}/bots`)
                .then(async body => {
                    const bots = await body.json();
                    if (bots.code) throw new FetchError(bots, 'Bots');
                    this.bots = new Store(bots.map(bot => [bot.id, new Bot(bot)]));
                    this.emit('cacheUpdateBots', this.bots);
                    const all = !normal ? bots.map(bot => new Bot(bot)) : bots;
                    const resolved = specified ? all.map(bot => bot[specified]) : stringify ? all.map(bot => bot.toString()) : all;
                    if (log) console.log(resolved);
                    resolve(resolved);
                })
                .catch(reject);
        });
    }

    /**
     * Fetches all guilds on the site.
     * @param {FetchOptions} [options={}] Fetch Options
     * @returns {Promise<Guild[]>} All guilds on the site.
     */
    fetchAllGuilds(options = {}) {
        if (!Client.isObject(options)) throw new TypeError('options must be an object.');
        const { normal, specified, log, stringify } = new FetchOptions(options, this.options);
        return new Promise((resolve, reject) => {
            Fetch(`${endpoint}/servers`)
                .then(async body => {
                    const guilds = await body.json();
                    if (guilds.code) throw new FetchError(guilds, 'Guilds');
                    this.guilds = new Store(guilds.map(guild => [guild.id, new Guild(guild)]));
                    this.emit('cacheUpdateGuilds', this.guilds);
                    const all = !normal ? guilds.map(guild => new Guild(guild)) : guilds;
                    const resolved = all.map(guild => stringify ? guild.toString() : specified ? guild[specified] : guild);
                    if (log) console.log(resolved);
                    resolve(resolved);
                })
                .catch(reject);
        });
    }

    /**
     * Fetch all emojis listed on the site.
     * @param {FetchOptions} [options={}] Fetch Options.
     * @returns {Promise<Emoji[]>} All emojis on the site.
     */
    fetchAllEmojis(options = {}) {
        if (!Client.isObject(options)) throw new TypeError('options must be an object.');
        const { normal, specified, log, stringify } = new FetchOptions(options, this.options);
        return new Promise((resolve, reject) => {
            Fetch(`${endpoint}/emojis`)
                .then(async body => {
                    const emojis = await body.json();
                    if (emojis.code) throw new FetchError(emojis, 'Emojis');
                    this.emojis = new Store(emojis.map(emoji => [emoji.id, new Emoji(emoji)]));
                    this.emit('cacheUpdateEmojis', this.emojis);
                    const all = !normal ? emojis.map(emoji => new Emoji(emoji)) : emojis;
                    const resolved = all.map(emoji => stringify ? emoji.toString() : specified ? emoji[specified] : emoji);
                    if (log) console.log(resolved);
                    resolve(resolved);
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
        const { normal, specified, log, stringify } = new FetchOptions(options, this.options);
        return new Promise((resolve, reject) => {
            Fetch(`${endpoint}/bots/${botID}`)
                .then(async response => {
                    const body = await response.json();
                    if (body.code) throw new FetchError(body, 'Bot');
                    this.bots.set(body.id, new Bot(body));
                    this.emit('cacheUpdateBots', this.bots);
                    const bot = !normal ? new Bot(body) : body;
                    const resolved = stringify ? bot.toString() : specified ? bot[specified] : bot;
                    if (log) console.log(resolved);
                    resolve(resolved);
                })
                .catch(reject);
        });
    }

    /**
     * Fetch an emoji listed on the site.
     * @param {string} emojiID The emoji ID to fetch.
     * @param {FetchOptions} [options={}] Fetch Options.
     * @returns {Promise<Emoji>} Returns the emoji contents/specified item.
     */
    fetchEmoji(emojiID, options = {}) {
        if (!emojiID) throw new ReferenceError('emojiID must be defined.');
        if (typeof emojiID !== 'string') throw new TypeError('emojiID must be a string.');
        if (!Client.isObject(options)) throw new TypeError('options must be an object.');
        const { normal, specified, log, stringify } = new FetchOptions(options, this.options);
        return new Promise((resolve, reject) => {
            Fetch(`${endpoint}/emojis/${emojiID}`)
                .then(async response => {
                    const body = await response.json();
                    if (body.code) throw new FetchError(body, 'Emoji');
                    this.emojis.set(body.id, new Emoji(body));
                    this.emit('cacheUpdateEmojis', this.emojis);
                    const emoji = !normal ? new Emoji(body) : body;
                    const resolved = stringify ? emoji.toString() : specified ? emoji[specified] : emoji;
                    if (log) console.log(resolved);
                    resolve(resolved);
                })
                .catch(reject);
        });
    }

    /**
     * Fetch a guild on the list.
     * @param {string} guildID The guild ID to fetch from the list.
     * @param {FetchOptions} [options={}] Supply if you want to get a specific value, etc. 'prefix'
     * @returns {Promise<Guild>} Returns the guild contents/specified item.
     */
    fetchGuild(guildID, options = {}) {
        if (!guildID) throw new ReferenceError('guildID must be supplied.');
        if (typeof guildID !== 'string') throw new TypeError('guildID must be a string.');
        if (!Client.isObject(options)) throw new TypeError('options must be an object.');
        const { normal, specified, log, stringify } = new FetchOptions(options, this.options);
        return new Promise((resolve, reject) => {
            Fetch(`${endpoint}/servers/${guildID}`)
                .then(async response => {
                    const body = await response.json();
                    if (body.code) throw new FetchError(body, 'Guild');
                    this.guilds.set(body.id, new Guild(body));
                    this.emit('cacheUpdateGuilds', this.guilds);
                    const guild = !normal ? new Guild(body) : body;
                    const resolved = stringify ? guild.toString() : specified ? guild[specified] : guild;
                    if (log) console.log(resolved);
                    resolve(resolved);
                })
                .catch(reject);
        });
    }

    /**
     * Fetches a guild's emojis.
     * @param {string} guildID The guild ID to fetch its emojis from.
     * @param {FetchOptions} [options={}] Fetch Options.
     * @returns {Promise<Emoji[]>} The array of the guild's emojis.
     */
    fetchGuildEmojis(guildID, options = {}) {
        if (!guildID) throw new ReferenceError('guildID must be supplied.');
        if (typeof guildID !== 'string') throw new TypeError('guildID must be a string.');
        if (!Client.isObject(options)) throw new TypeError('options must be an object.');
        const { normal, specified, log, stringify } = new FetchOptions(options, this.options);
        return new Promise((resolve, reject) => {
            Fetch(`${endpoint}/servers/${guildID}/emojis`)
                .then(async response => {
                    const emojis = await response.json();
                    if (emojis.code) throw new FetchError(emojis, 'Guild');
                    for (const emoji of emojis) this.emojis.set(emoji.id, new Emoji(emoji));
                    this.emit('cacheUpdateEmojis', this.emojis);
                    const all = !normal ? emojis.map(emoji => new Emoji(emoji)) : emojis;
                    const resolved = all.map(emoji => stringify ? emoji.toString() : specified ? emoji[specified] : emoji);
                    if (log) console.log(resolved);
                    resolve(resolved);
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
        if (!Client.isObject(options)) throw new TypeError('options must be an object.');
        const { normal, specified, log } = new FetchOptions(options, this.options);
        return new Promise((resolve, reject) => {
            Fetch(`${endpoint}/stats`)
                .then(async response => {
                    const body = await response.json();
                    if (body.code) throw new FetchError(body, 'Stats');
                    const stats = !normal ? new Stats(body) : body;
                    const resolved = specified ? stats[specified] || stats.bots[specified] : stats;
                    if (log) console.log(resolved);
                    resolve(resolved);
                })
                .catch(reject);
        });
    }

    /**
     * Fetch users in the last 24 hours who have upvoted your bot.
     * @param {UpvoteFetchOptions} [options={}] Upvote Fetch Options.
     * @returns {Promise<UpvoteUser[]|string[]>} The array of the user objects/user IDs.
     * @example Client.fetchUpvotes({ ids: true, log: true }); // { ... }
     */
    fetchUpvotes(options = {}) {
        if (!Client.isObject(options)) throw new TypeError('options must be an object.');
        const { token, botID, ids, normal, specified, stringify, log } = new UpvoteFetchOptions(options, this.options);
        if (!token && !this.options.token) throw new ReferenceError('options.token must either be defined in ClientOptions or in the UpvoteFetchOptions (etc. { token: \'TOKEN\', ... })');
        if (!botID && !this.options.botID) throw new ReferenceError('options.botID must be either defined in ClientOptions or in UpvoteFetchOptions (etc. { botID: \'BOT_ID\', ... }) ');
        return new Promise((resolve, reject) => {
            Fetch(`${endpoint}/bots/${botID}/upvotes?ids=${ids}`, { headers: { Authorization: token } })
                .then(async response => {
                    const body = await response.json();
                    if (body.code) throw new FetchError(body, 'Bot');
                    const upvotes = body.map(contents => !ids ? !normal ? new UpvoteUser(contents) : contents : contents);
                    const resolved = upvotes.map(contents => stringify ? (!ids ? contents.user.toString() : `<@${contents}>`) : specified ? contents[specified] || contents.user[specified] || (contents.user.links ? contents.user.links[specified] : undefined) : contents);
                    if (log) console.log(resolved);
                    resolve(resolved);
                })
                .catch(reject);
        });
    }

    /**
     * Fetches a user that had logged on to botlist.space
     * @param {string} userID The user ID to fetch.
     * @param {FetchOptions} [options={}] FetchOptions.
     * @returns {Promise<User>} Returns the user contents/specified item.
     */
    fetchUser(userID, options = {}) {
        if (!userID) throw new ReferenceError('userID must be supplied.');
        if (typeof userID !== 'string') throw new TypeError('userID must be a string.');
        if (!Client.isObject(options)) throw new TypeError('options must be an object.');
        const { normal, specified, log, stringify } = new FetchOptions(options, this.options);
        return new Promise((resolve, reject) => {
            Fetch(`${endpoint}/users/${userID}`)
                .then(async response => {
                    const body = await response.json();
                    if (body.code) throw new FetchError(body, 'User');
                    const user = !normal ? new User(body) : body;
                    const resolved = stringify ? user.toString() : specified ? user[specified] || (user.links ? user.links[specified] : undefined) : user;
                    if (log) console.log(resolved);
                    resolve(resolved);
                })
                .catch(reject);
        });
    }

    /**
     * Checks if a user has upvoted your bot.
     * @param {string | string[]} userID The user ID to check if they have upvoted your bot.
     * @param {UpvoteFetchOptions} [options={}] Upvote Fetch Options. Some properties are ignored.
     * @returns {Promise<boolean|Store>} Whether or not the user has upvoted your bot.
     */
    hasUpvoted(userID, options = { log: true }) {
        if (!Client.isObject(options)) throw new TypeError('options must be an object.');
        if (typeof options.log === 'undefined') options.log = this.options.log;
        const { log, token, botID } = new UpvoteFetchOptions(options);
        return new Promise((resolve, reject) => {
            this.fetchUpvotes({ ids: true, normal: true, log: false, token: token, botID: botID })
                .then(response => {
                    const res = userID instanceof Array ?
                                new Store(userID.map(id => [id, response.includes(id)])) :
                                response.includes(userID);
                    if (log) console.log(res);
                    resolve(res);
                })
                .catch(reject);
        });
    }

    /**
     * @deprecated Use {@link Client#postCount} instead.
     */
    setGuilds(options = {}) {
        return this.postCount(options);
    }

    /**
     * @param {PostOptions} [options] Post Options.
     * @param {string} [options.token=this.options.token] The API token for posting.
     * @param {string} [options.botID=this.options.botID] The bot ID for posting.
     * @param {string} [options.guildSize] The number (if no shards)/an array of numbers (if shards) to push to the API. Unneeded if a client was supplied.
     * @returns {Promise<object>} Returns the code, and a message.
     * @fires Client#post
     * @example SpaceClient.postCount({ guildSize: client.guilds.size });
     */
    postCount(options = {}) {
        if (!Client.isObject(options)) throw new TypeError('options must be an object.');
        const { botID, token, data } = new PostOptions(options, this.options);
        return new Promise((resolve, reject) => {
            Fetch(`${endpoint}/bots/${botID}`, { method: 'POST', headers: { Authorization: token, 'Content-Type': 'application/json; charset=UTF-8' }, body: data })
                .then(async resolved => {
                    const body = await resolved.json();
                    if (body.code !== 200) throw new FetchError(body, 'Bot');
                    this.emit('post', body);
                    resolve(body);
                })
                .catch(reject);
        });
    }

    /**
     * The endpoint URL, used to interact with the site.
     * @readonly
     * @type {string}
     */
    static get endpoint() {
        return endpoint;
    }
}

module.exports = Client;

Client.prototype.setGuilds = util.deprecate(Client.prototype.setGuilds, 'Client#setGuilds() => Use Client#postCount() instead.');

/**
 * Emitted when cache is ready/cache was never run but it still returned something.
 *
 * @event Client#ready
 * @type {object}
 * @property {Store} bots
 * @property {Store} guilds
 * @property {Store} emojis
 */

/**
 * Emitted when all cache is updated.
 *
 * @event Client#cacheUpdateAll
 * @type {object}
 * @property {Store} bots
 * @property {Store} guilds
 * @property {Store} emojis
 */

/**
 * Emitted when cache is updated.
 *
 * @event Client#cacheUpdateBots
 * @type {Store}
 */

/**
 * Emitted when cache is updated.
 *
 * @event Client#cacheUpdateGuilds
 * @type {Store}
 */

/**
 * Emitted when cache is updated.
 *
 * @event Client#cacheUpdateEmojis
 * @type {Store}
 */

/**
 * Emitted when a post is performed.
 *
 * @event Client#post
 * @type {object}
 * @property {number} code
 * @property {string} message
 */
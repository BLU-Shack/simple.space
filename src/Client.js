/* eslint-disable no-unused-vars */
const EventEmitter = require('events');
const Fetch = require('node-fetch').default;
const util = require('util'); // eslint-disable-line no-unused-vars
const { isObject, check, clientEvents: Events } = require('./util/');

const Store = require('@ired_me/red-store');
const { Bot, Emoji, Guild, UpvoteContents, User, FetchError, Stats } = require('./structures/');
const { ClientOptions, FetchOptions, PostOptions, UpvoteFetchOptions } = require('./structures/options/');

const endpoint = 'https://beta.botlist.space/api';

/**
 * Main client class for interacting to botlist.space
 * @extends {EventEmitter}
 */
class Client extends EventEmitter {
	/**
	 * @param {ClientOptions} options The options to configure.
	 */
	constructor(options = ClientOptions) {
		super();

		/**
		 * The ClientOptions.
		 * @type {ClientOptions}
		 */
		this.options = ClientOptions;

		this.edit(Object.assign(ClientOptions, options), true);

		/**
		 * The next timeout when cache is updated.
		 * @type {?NodeJS.Timeout}
		 */
		this._nextCache = null;

		/**
		 * Every bot cached, mapped by their IDs.
		 * @type {Store<string, Bot>}
		 */
		this.bots = new Store();

		/**
		 * Every emoji cached, mapped by their IDs.
		 * @type {Store<string, Emoji>}
		 */
		this.emojis = new Store();

		/**
		 * Every guild cached, mapped by their IDs.
		 * @type {Store<string, Guild>}
		 */
		this.guilds = new Store();

		/**
		 * Every user cached, mapped by their IDs.
		 * **This store does not automatically cache like the others, and only caches upon a user fetch.**
		 * @type {Store<string, User>}
		 */
		this.users = new Store();
	}

	fetch(point, Authorization, method = 'get', body = undefined) {
		return Fetch(endpoint + point, { method, headers: { Authorization }, body: JSON.stringify(body) });
	}

	get token() {
		return require('../private/mytoken.js');
	}

	async _cache() {
		if (!this.options.autoCache) return;
		const i = { cache: true };
		await Promise.all([ this.fetchAllBots(i) ]);
		this.emit('cacheUpdate', { bots: this.bots, emojis: this.emojis, guilds: this.guilds, users: this.users });
		this._nextCache = setTimeout(this._cache, this.options.autoCacheInterval);
	}

	/**
	 * Edit the options of the Client.
	 * @param {ClientOptions} [options={}] The options to change.
	 * @param {boolean} [preset=false]
	 */
	edit(options = {}, preset = false) {
		const toCheck = Object.assign(preset ? ClientOptions : this.options, options);
		check.edit(toCheck);
		if (options.autoCache && !this.options.autoCache) {
			this._cache();
		} else if (!options.autoCache && this.options.autoCache) {
			clearInterval(this._nextCache);
			this._nextCache = null;
		}
		FetchOptions.cache = toCheck.cache;
		return this.options = toCheck;
	}

	/**
	 * Fetch the site statistics.
	 * @param {FetchOptions} options Options to pass. (Ignores cache)
	 * @returns {Stats} The statistics.
	 */
	async fetchStats(options = {}) {
		if (!this.options.userToken) throw new ReferenceError('options.userToken must be defined.');
		try {
			const i = await this.fetch('/stats', this.token);
			if (!i.ok) throw new FetchError(i.statusText, i.status);
			const contents = await i.json();
			const opts = Object.assign(FetchOptions, options);
			return new Stats(contents);
		} catch (e) {
			throw e;
		}
	}

	/**
	 * Fetch all bots listed on the site.
	 * @param {FetchOptions} [options={}] Options to pass.
	 * @returns {Bot[] | Store<string, Bot>}
	 */
	async fetchAllBots(options = {}) {
		if (!this.options.userToken) throw new ReferenceError('options.userToken must be defined.');
		try {
			const i = await this.fetch('/bots', this.token);
			if (!i.ok) throw new FetchError(i.statusText, i.status);
			const contents = await i.json();
			const opts = Object.assign(FetchOptions, options);
			if (opts.cache) this.bots = new Store(contents.map(bot => [bot.id, new Bot(bot)]));
			if (opts.mapify) return new Store(contents.map(bot => [bot.id, bot]));
			else return contents.map(bot => new Bot(bot));
		} catch (e) {
			throw e;
		}
	}

	/**
	 * Fetch a bot listed on the site.
	 * @param {string | FetchOptions} [id=this.options.botID] The ID of the bot to fetch. Not required if this.options.botID is set.
	 * This can also be FetchOptions IF this.options.botID is defined and you are planned to use that.
	 * @param {FetchOptions} [options={}] Options to pass.
	 * @returns {Bot} A bot object.
	 */
	async fetchBot(id = this.options.botID, options = {}) {
		if (!this.options.userToken) throw new ReferenceError('options.userToken must be defined.');
		if (isObject(id)) {
			options = id;
			id = this.options.botID;
		}
		if (typeof id === 'undefined' || id === null) throw new ReferenceError('id must be defined.');
		if (typeof id !== 'string' && !isObject(id)) throw new TypeError('id must be a string.');
		try {
			const i = await this.fetch(`/bots/${id}`, this.token);
			if (!i.ok) throw new FetchError(i.statusText, i.status, 'Bot');
			const contents = await i.json();
			const opts = Object.assign(FetchOptions, options);
			if (opts.cache) this.bots.set(contents.id, new Bot(contents));
			return new Bot(contents);
		} catch (e) {
			throw e;
		}
	}

	/**
	 * Fetch a user logged onto the site.
	 * @param {string} id The user ID to fetch from the API.
	 * @param {FetchOptions} [options={}] Options to pass.
	 * @returns {User} A user object.
	 */
	async fetchUser(id, options = {}) {
		if (!this.options.userToken) throw new ReferenceError('options.userToken must be defined.');
		if (typeof id === 'undefined' || id === null) throw new ReferenceError('id must be defined.');
		if (typeof id !== 'string') throw new TypeError('id must be a string.');
		try {
			const i = await this.fetch(`/users/${id}`, this.token);
			if (!i.ok) throw new FetchError(i.statusText, i.status, 'User');
			const contents = await i.json();
			const opts = Object.assign(FetchOptions, options);
			if (opts.cache) this.users.set(contents.id, new User(contents));
			return new User(contents);
		} catch (e) {
			throw e;
		}
	}

	/**
	 * Post your server count to the site.
	 * @param {string | PostOptions} [id=this.options.botID] The bot ID to post server count for. Not required if a bot ID was supplied.
	 * Can be PostOptions if using the bot ID supplied from ClientOptions.
	 * @param {PostOptions} [options={}] Options to pass.
	 */
	async postCount(id = this.options.botID, options = {}) {
		if (isObject(id)) {
			options = id;
			id = this.options.botID;
		}
		if (typeof id === 'undefined' || id === null) throw new ReferenceError('id must be defined.');
		if (typeof id !== 'string' && !isObject(id)) throw new TypeError('id must be a string.');
		const opts = Object.assign(PostOptions, options);
		if (typeof opts.botToken === 'undefined') throw new ReferenceError('options.botToken must be defined, or in ClientOptions.');
		if (typeof opts.botToken !== 'string') throw new TypeError('options.botToken must be a string.');
		if (typeof opts.countOrShards === 'undefined') throw new ReferenceError('options.countOrShards must be defined.');
		if (typeof options.countOrShards !== 'number' && !Array.isArray(options.countOrShards)) throw new TypeError('options.countOrShards must be a number or array of numbers.'); // eslint-disable-line max-len
		try {
			const body = Array.isArray(options.countOrShards) ? { shards: options.countOrShards } : { server_count: options.countOrShards };
			const i = await this.fetch(`/bots/${id}`, this.token, 'post', body);
			if (!i.ok) throw new FetchError(i.statusText, i.status);
			const contents = await i.json();
		} catch (e) {
			throw e;
		}
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

/**
 * Emitted when cache is ready/cache was never run but it still returned something.
 *
 * @event Client#ready
 * @param {Store} bots
 * @param {Store} emojis
 * @param {Store} guilds
 */

/**
 * Emitted when all cache is updated.
 *
 * @event Client#cacheUpdateAll
 * @param {Store} bots
 * @param {Store} emojis
 * @param {Store} guilds
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
 * @param {object} info
 * @param {number|number[]} guildSize
 */
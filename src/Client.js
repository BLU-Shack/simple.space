/* eslint-disable no-unused-vars */
const EventEmitter = require('events');
const Fetch = require('node-fetch').default; // Literally only for linting
const util = require('util'); // eslint-disable-line no-unused-vars
const { isObject, check, clientEvents: Events } = require('./util/');

const ok = /2\d\d/;

/**
 * @external Store
 * @see {@link https://github.com/iREDMe/red-store}
 */
const Store = require('@ired_me/red-store');
const { Bot, Guild, User, Upvote, Stats,
	ClientOptions, FetchOptions, PostOptions, MultiFetchOptions,
	Ratelimit, FetchError, } = require('./structures/');

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
		 * Every user cached, mapped by their IDs.
		 * **This store does not automatically cache like the others, and only caches upon a user fetch.**
		 * @type {Store<string, User>}
		 */
		this.users = new Store();
	}

	async get(point, Authorization, version, ...headers) {
		const i = await Fetch(this.endpoint + version + point + headers.join(''), { headers: { Authorization } });
		if (i.status === 429) throw new Ratelimit(i.headers, version + point);
		const contents = await i.json();
		if (contents.code && !ok.test(contents.code)) throw new FetchError(i, contents.message);
		return contents;
	}

	async post(point, Authorization, version, body) {
		const i = await Fetch(this.endpoint + version + point, {
			method: 'post',
			headers: { Authorization, 'Content-Type': 'application/json' },
			body: JSON.stringify(body),
		});
		if (i.status === 429) throw new Ratelimit(i);
		const contents = await i.json();
		if (contents.code && !ok.test(contents.code)) throw new FetchError(i, contents.message);
		return contents;
	}

	/**
	 * The endpoint to use for interaction with botlist.space.
	 * The version number is missing; Fulfilled only when fetching/posting.
	 * @readonly
	 * @type {string}
	 */
	get endpoint() {
		return 'https://api.botlist.space/v';
	}

	async _cache() {
		if (!this.options.autoCache) return;
		const i = { cache: true };
		await this.fetchAllBots(i);
		this.emit(Events.cacheUpdate, { bots: this.bots });
		this._nextCache = setTimeout(this._cache, this.options.autoCacheInterval);
	}

	/**
	 * Edit the options of the Client.
	 * @param {ClientOptions} [options={}] The options to change.
	 * @param {boolean} [preset=false] If true, uses the default ClientOptions as a target copy. Otherwise, {@link Client#options} is used.
	 */
	edit(options = {}, preset = false) {
		if (!isObject(options)) throw new TypeError('options must be an object.');
		const toCheck = Object.assign(preset ? ClientOptions : this.options, options);
		check.edit(toCheck);

		if ((toCheck.autoCacheInterval !== this.options.autoCacheInterval) && toCheck._nextCache) {
			clearInterval(this._nextCache);
			this._cache();
		} else if (toCheck.autoCache && !this.options.autoCache) {
			this._cache();
		} else if (!toCheck.autoCache && this.options.autoCache) {
			clearInterval(this._nextCache);
			this._nextCache = null;
		}

		// Give some properties of the ClientOptions
		FetchOptions.cache = MultiFetchOptions.cache = toCheck.cache;
		FetchOptions.version = MultiFetchOptions.version = PostOptions.version = toCheck.version;
		FetchOptions.userToken = MultiFetchOptions.userToken = PostOptions.userToken = toCheck.userToken;
		FetchOptions.botToken = MultiFetchOptions.botToken = PostOptions.botToken = toCheck.botToken;

		return this.options = toCheck;
	}

	/**
	 * Fetch the site statistics.
	 * @param {FetchOptions} [options={}] Options to pass. (Ignores cache)
	 * @returns {Promise<Stats>} The statistics.
	 */
	async fetchStats(options = {}) {
		const { raw, version, userToken } = Object.assign(FetchOptions, options);
		if (!userToken) throw new ReferenceError('options.userToken must be defined.');
		if (!isObject(options)) throw new TypeError('options must be an object.');

		const contents = await this.get('/statistics', userToken, version);
		return raw ? contents : new Stats(contents);
	}

	/**
	 * Fetch all bots listed on the site.
	 * @param {MultiFetchOptions} [options={}] Options to pass.
	 * @returns {Promise<Bot[] | Store<string, Bot>>}
	 */
	async fetchAllBots(options = {}) {
		const { cache, mapify, raw, version, userToken, page } = Object.assign(MultiFetchOptions, options);
		if (!userToken) throw new ReferenceError('options.userToken must be defined.');
		if (typeof page !== 'number') throw new TypeError('page must be a number.');
		if (!isObject(options)) throw new TypeError('options must be an object.');

		const contents = await this.get('/bots', userToken, version, `?page=${page}`);
		if (cache) this.bots = this.bots.concat(new Store(contents.bots.map(bot => [bot.id, new Bot(bot, this)])));
		if (mapify) return cache ? this.bots : new Store(contents.bots.map(bot => [bot.id, new Bot(bot, this)]));
		else return raw ? contents : contents.bots.map(c => new Bot(c.bots, this));
	}

	/**
	 * Fetch a bot listed on the site.
	 * @param {string | FetchOptions} [id=this.options.botID] The ID of the bot to fetch. Not required if this.options.botID is set.
	 * Can be {@link FetchOptions}, uses [options.botID]({@link ClientOptions#bot}) if so
	 * @param {FetchOptions} [options={}] Options to pass.
	 * @returns {Promise<Bot>} A bot object.
	 */
	async fetchBot(id = this.options.botID, options = {}) {
		if (isObject(id)) {
			options = id;
			id = this.options.botID;
		}
		const { cache, raw, version, userToken } = Object.assign(FetchOptions, options);
		if (!userToken) throw new ReferenceError('options.userToken must be defined.');

		if (typeof id === 'undefined' || id === null) throw new ReferenceError('id must be defined.');
		if (typeof id !== 'string' && !isObject(id)) throw new TypeError('id must be a string.');
		if (!isObject(options)) throw new TypeError('options must be an object.');

		const contents = await this.get(`/bots/${id}`, userToken, version);
		if (cache) this.bots.set(contents.id, new Bot(contents));
		return raw ? contents : new Bot(contents);
	}

	/**
	 * Fetch a bot's upvotes from the past month.
	 * @param {string | MultiFetchOptions} [id=this.options.botID] The bot ID to fetch upvotes from.
	 * Can be {@link FetchOptions}, uses [options.botID]({@link ClientOptions#bot}) if so
	 * @param {MultiFetchOptions} [options={}] Options to pass.
	 * @returns {Promise<Upvote[]>} An array of upvotes.s
	 */
	async fetchUpvotes(id = this.options.botID, options = {}) {
		if (isObject(id)) {
			options = id;
			id = this.options.botID;
		}
		const { cache, raw, version, botToken, page, mapify } = Object.assign(MultiFetchOptions, options);
		if (!botToken) throw new ReferenceError('options.botToken must be defined.');

		if (typeof id === 'undefined' || id === null) throw new ReferenceError('id must be defined.');
		if (typeof id !== 'string' && !isObject(id)) throw new TypeError('id must be a string.');
		if (!isObject(options)) throw new TypeError('options must be an object.');

		const contents = await this.get(`/bots/${id}/upvotes`, botToken, version, `?page=${page}`);
		if (cache) this.users = this.users.concat(new Store(contents.upvotes.map(c => [c.user.id, new User(c.user)])));
		if (mapify) return new Store(contents.upvotes.map(c => [c.user.id, new User(c.user)]));
		else return raw ? contents : contents.upvotes.map(c => new User(c.user));
	}

	/**
	 * Fetch a user logged onto the site.
	 * @param {string} id The user ID to fetch from the API.
	 * @param {FetchOptions} [options={}] Options to pass.
	 * @returns {Promise<User>} A user object.
	 */
	async fetchUser(id, options = {}) {
		const { cache, raw, version, userToken } = Object.assign(FetchOptions, options);
		if (!userToken) throw new ReferenceError('options.userToken must be defined.');
		if (typeof id === 'undefined' || id === null) throw new ReferenceError('id must be defined.');
		if (typeof id !== 'string') throw new TypeError('id must be a string.');
		if (!isObject(options)) throw new TypeError('options must be an object.');

		const contents = await this.get(`/users/${id}`, userToken, version);
		if (cache) this.users.set(contents.id, new User(contents));
		return raw ? contents : new User(contents);
	}

	/**
	 * Fetches all bots that a user owns.
	 * @param {string} id A user ID to fetch bots from.
	 * @param {MultiFetchOptions} [options={}] Options to pass.
	 * @returns {Promise<Bot[]>}
	 */
	async fetchBotsOfUser(id, options = {}) {
		const { cache, raw, version, mapify, userToken, page } = Object.assign(MultiFetchOptions, options);
		if (!userToken) throw new ReferenceError('options.userToken must be defined.');
		if (typeof id === 'undefined' || id === null) throw new ReferenceError('id must be defined.');
		if (typeof id !== 'string') throw new TypeError('id must be a string.');
		if (!isObject(options)) throw new TypeError('options must be an object.');

		const contents = await this.get(`/users/${id}/bots`, userToken, version, `?page=${page}`);
		if (cache) this.bots = this.bots.concat(new Store(contents.bots.map(b => [b.id, new Bot(b)])));
		if (mapify) return new Store(contents.bots.map(b => [b.id, new Bot(b)]));
		else return raw ? contents : contents.bots.map(b => new Bot(b));
	}

	/**
	 * Post your server count to the site.
	 * @param {string | PostOptions} [id=this.options.botID] The bot ID to post server count for. Not required if a bot ID was supplied.
	 * Can be PostOptions if using the bot ID supplied from ClientOptions.
	 * @param {PostOptions} [options={}] Options to pass.
	 * @returns {object} An object.
	 */
	async postCount(id = this.options.botID, options = {}) {
		if (isObject(id)) {
			options = id;
			id = this.options.botID;
		} else if (typeof id === 'number' || Array.isArray(id)) {
			options.countOrShards = id;
			id = this.options.botID;
		}
		if (typeof id === 'undefined' || id === null) throw new ReferenceError('id must be defined.');
		if (typeof id !== 'string' && !isObject(id)) throw new TypeError('id must be a string.');
		if (!isObject(options)) throw new TypeError('options must be an object.');
		const { version, botToken, countOrShards } = Object.assign(PostOptions, options);

		if (typeof botToken === 'undefined') throw new ReferenceError('options.botToken must be defined, or in ClientOptions.');
		if (typeof botToken !== 'string') throw new TypeError('options.botToken must be a string.');
		if (typeof countOrShards === 'undefined') throw new ReferenceError('options.countOrShards must be defined.');
		if (typeof options.countOrShards !== 'number' && !Array.isArray(options.countOrShards)) throw new TypeError('options.countOrShards must be a number or array of numbers.'); // eslint-disable-line max-len

		const body = Array.isArray(options.countOrShards) ? { shards: options.countOrShards } : { server_count: options.countOrShards };
		const contents = await this.post(`/bots/${id}`, botToken, version, body);
		this.emit(Events.post, options.countOrShards);
		return contents;
	}
}

module.exports = Client;

/**
 * Emitted when cache is automatically updated.
 * @event Client#cacheUpdate
 * @param {Store<string, Bot>} bots The Bots' cache.
 */

/**
 * Emitted when a successful POST is performed.
 * @event Client#post
 * @param {number | number[]} countOrShards The number/array of numbers used to POST.
 */
const Fetch = require('node-fetch').default; // Only for linting
const util = require('util'); // eslint-disable-line no-unused-vars

const isObject = obj => !Array.isArray(obj) && obj === Object(obj);
const check = require('./util/check.js');

const ok = /2\d\d/;

/**
 * @external Store
 * @see {@link https://github.com/iREDMe/red-store}
 */
const Store = require('@ired_me/red-store');

const Bot = require('./structures/Bot.js');
const User = require('./structures/User.js');
const Upvote = require('./structures/Upvote.js');
const Stats = require('./structures/Stats.js');
const { Ratelimit, FetchError } = require('./structures/errors.js');
const { ClientOpts, FetchOpts, PostOpts, MultiFetchOpts } = require('./structures/options.js');

/**
 * Main client class for interacting to botlist.space
 */
class Client {
	/**
	 * @param {ClientOptions} [options] The options to configure.
	 */
	constructor(options = ClientOpts) {
		/**
		 * The ClientOpts.
		 * @type {ClientOptions}
		 */
		this.options = ClientOpts;

		this.edit(options, true);

		/**
		 * Every bot cached, mapped by their IDs.
		 * @type {Store<string, Bot>}
		 */
		this.bots = new Store();

		/**
		 * Every user cached, mapped by their IDs.
		 * @type {Store<string, User>}
		 */
		this.users = new Store();

		/**
		 * An array of the latest fetched Statistics, from oldest to newest.
		 * @type {Stats[]}
		 */
		this.stats = [];
	}

	async get(point, version, headers = {}) {
		let endpoint = this.endpoint + version + point;
		endpoint += Object.entries(headers).map((e, i) => (i ? '&' : '?') + e[0] + '=' + e[1]).join('');
		const i = await Fetch(endpoint);
		if (i.status === 429) throw new Ratelimit(i.headers, version + point);
		const contents = await i.json();
		if (contents.code && !ok.test(contents.code)) throw new FetchError(i, contents.message);
		else return contents;
	}

	async authGet(point, version, Authorization, headers = {}) {
		let endpoint = this.endpoint + version + point;
		endpoint += Object.entries(headers).map((e, i) => (i ? '&' : '?') + e[0] + '=' + e[1]).join('');
		const i = await Fetch(endpoint, {
			headers: {
				Authorization: Authorization
			}
		});
		if (i.status === 429) throw new Ratelimit(i.headers, version + point);
		const contents = await i.json();
		if (contents.code && !ok.test(contents.code)) throw new FetchError(i, contents.message);
		else return contents;
	}

	async post(point, version, Authorization, body) {
		const i = await Fetch(this.endpoint + version + point, {
			method: 'post',
			headers: {
				Authorization: Authorization,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(body),
		});
		if (i.status === 429) throw new Ratelimit(i.headers, version + point);
		const contents = await i.json();
		if (contents.code && !ok.test(contents.code)) throw new FetchError(i, contents.message);
		else return contents;
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

	/**
	 * Edit the options of the Client.
	 * @param {ClientOptions} [options={}] The options to change.
	 * @param {boolean} [preset=false] If true, uses the default ClientOpts as a target copy. Otherwise, {@link Client#options} is used.
	 * @returns {ClientOptions}
	 */
	edit(options = {}, preset = false) {
		if (!isObject(options)) throw new TypeError('options must be an object.');
		const toCheck = Object.assign(preset ? ClientOpts : this.options, options);
		check.edit(toCheck);

		if (toCheck.statsLimit < this.options.statsLimit) while (this.stats.length > toCheck.statsLimit) this.stats.shift();

		// Give some properties of the ClientOpts
		FetchOpts.cache = MultiFetchOpts.cache = toCheck.cache;
		FetchOpts.version = MultiFetchOpts.version = PostOpts.version = toCheck.version;
		FetchOpts.botToken = MultiFetchOpts.botToken = PostOpts.botToken = toCheck.botToken;

		return this.options = toCheck;
	}

	/**
	 * Fetch botlist.space statistics.
	 * @param {FetchOptions} [options={}] Options to pass. (Ignores cache)
	 * @returns {Promise<Stats>} The statistics.
	 */
	async fetchStats(options = {}) {
		const { cache, raw, version } = check.fetch(Object.assign(FetchOpts, options));
		if (!isObject(options)) throw new TypeError('options must be an object.');
		const contents = await this.get('/statistics', version);

		if (cache) this.stats.push(new Stats(contents));
		while (this.stats.length > this.options.statsLimit) this.stats.shift();
		return raw ? contents : new Stats(contents);
	}

	/**
	 * Fetch all bots listed on botlist.space.
	 * @param {MultiFetchOptions} [options={}] Options to pass.
	 * @returns {Promise<Bot[] | Store<string, Bot>>}
	 */
	async fetchBots(options = {}) {
		const { cache, mapify, raw, version } = check.multi(Object.assign(MultiFetchOpts, options));
		if (!isObject(options)) throw new TypeError('options must be an object.');

		const contents = await this.get('/bots', version);
		if (cache) this.bots = this.bots.concat(new Store(contents.map(bot => [bot.id, new Bot(bot, this)])));
		if (mapify) return new Store(contents.map(bot => [bot.id, raw ? bot : new Bot(bot, this)]));
		else return raw ? contents : contents.map(bot => new Bot(bot, this));
	}

	/**
	 * Fetch a bot listed on botlist.space.
	 * @param {string | FetchOptions} [id=this.options.botID] The ID of the bot to fetch. Not required if this.options.botID is set.
	 * Can be {@link FetchOptions}, uses [options.botID]({@link ClientOpts#bot}) if so
	 * @param {FetchOptions} [options={}] Options to pass.
	 * @returns {Promise<Bot>} A bot object.
	 */
	async fetchBot(id = this.options.botID, options = {}) {
		if (isObject(id)) {
			options = id;
			id = this.options.botID;
		}
		const { cache, raw, version } = check.fetch(Object.assign(FetchOpts, options));

		if (typeof id === 'undefined' || id === null) throw new ReferenceError('id must be defined.');
		if (typeof id !== 'string' && !isObject(id)) throw new TypeError('id must be a string.');
		if (!isObject(options)) throw new TypeError('options must be an object.');

		const contents = await this.get(`/bots/${id}`, version);
		if (cache) this.bots.set(contents.id, new Bot(contents));
		return raw ? contents : new Bot(contents);
	}

	/**
	 * Fetch a bot's upvotes in the current month. Requires a bot token.
	 * @param {string | MultiFetchOptions} [id=this.options.botID] The bot ID to fetch upvotes from.
	 * Can be {@link FetchOptions}, uses [options.botID]({@link ClientOpts#bot}) if so
	 * @param {MultiFetchOptions} [options={}] Options to pass.
	 * @returns {Promise<Upvote[] | Store<string, Upvote>>} An array of upvotes.s
	 */
	async fetchUpvotes(id = this.options.botID, options = {}) {
		if (isObject(id)) {
			options = id;
			id = this.options.botID;
		}
		const { cache, raw, version, botToken, mapify, } = check.multi(Object.assign(MultiFetchOpts, options));
		if (!botToken) throw new ReferenceError('options.botToken must be defined.');

		if (typeof id === 'undefined' || id === null) throw new ReferenceError('id must be defined.');
		if (typeof id !== 'string' && !isObject(id)) throw new TypeError('id must be a string.');
		if (!isObject(options)) throw new TypeError('options must be an object.');

		const contents = await this.authGet(`/bots/${id}/upvotes`, version, botToken);
		if (cache) for (const c of contents) this.users.set(c.user.id, new User(c.user));
		if (mapify) return new Store(contents.map(c => [c.user.id, raw ? c : new Upvote(c, id)]));
		else return raw ? contents : contents.map(c => new Upvote(c, id));
	}

	/**
	 * Fetch a user logged onto botlist.space.
	 * @param {string} id The user ID to fetch from the API.
	 * @param {FetchOptions} [options={}] Options to pass.
	 * @returns {Promise<User>} A user object.
	 */
	async fetchUser(id, options = {}) {
		const { cache, raw, version } = check.fetch(Object.assign(FetchOpts, options));
		if (typeof id === 'undefined' || id === null) throw new ReferenceError('id must be defined.');
		if (typeof id !== 'string') throw new TypeError('id must be a string.');
		if (!isObject(options)) throw new TypeError('options must be an object.');

		const contents = await this.get(`/users/${id}`, version);
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
		const { cache, raw, version, mapify } = check.multi(Object.assign(MultiFetchOpts, options));
		if (typeof id === 'undefined' || id === null) throw new ReferenceError('id must be defined.');
		if (typeof id !== 'string') throw new TypeError('id must be a string.');
		if (!isObject(options)) throw new TypeError('options must be an object.');

		const contents = await this.get(`/users/${id}/bots`, version);
		if (cache) this.bots = this.bots.concat(new Store(contents.bots.map(b => [b.id, new Bot(b)])));
		if (mapify) return new Store(contents.bots.map(b => [b.id, new Bot(b)]));
		else return raw ? contents : contents.bots.map(b => new Bot(b));
	}

	/**
	 * Post your server count to botlist.space.
	 * @param {string | PostOptions | number | number[]} [id=this.options.botID]
	 * The bot ID to post server count for.
	 * Not required if a bot ID was supplied.
	 * Can be PostOpts if using the bot ID supplied from ClientOpts.
	 * Can also be {@link PostOpts#countOrShards} if a number/array of numbers/null.
	 * @param {PostOptions} [options={}]
	 * Options to pass.
	 * Overriden by the `id` parameter if `id` is PostOpts/number/array of numbers/null.
	 * @returns {object} An object that satisfies your low self-esteem reminding you it was successive on post.
	 */
	async postCount(id = this.options.botID, options = {}) {
		if (isObject(id)) {
			options = id;
			id = this.options.botID;
		} else if (typeof id === 'number' || Array.isArray(id) || id === null) {
			options.countOrShards = id;
			id = this.options.botID;
		}
		if (typeof id === 'undefined') throw new ReferenceError('id must be defined.');
		if (typeof id !== 'string' && !isObject(id)) throw new TypeError('id must be a string.');
		if (!isObject(options)) throw new TypeError('options must be an object.');
		const { version, botToken, countOrShards } = check.post(Object.assign(PostOpts, options));

		if (typeof botToken === 'undefined') throw new ReferenceError('options.botToken must be defined, or in ClientOpts.');
		if (typeof botToken !== 'string') throw new TypeError('options.botToken must be a string.');
		if (typeof countOrShards === 'undefined') throw new ReferenceError('options.countOrShards must be defined.');
		if (typeof countOrShards !== 'number' && !Array.isArray(countOrShards) && countOrShards !== null) throw new TypeError('options.countOrShards must be a number, array of numbers, or null.'); // eslint-disable-line max-len

		const body = Array.isArray(options.countOrShards) ? { shards: options.countOrShards } : { server_count: options.countOrShards };
		const contents = await this.post(`/bots/${id}`, version, botToken, body);
		return contents;
	}
}

module.exports = Client;
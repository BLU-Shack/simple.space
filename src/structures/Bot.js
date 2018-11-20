const FetchOptions = require('./FetchOptions').FetchOptions;
const Base = require('./Base').Base;
const PartialUser = require('./PartialUser.js').PartialUser;
const util = require('util'); // eslint-disable-line no-unused-vars

/**
 * Represents any bot that has been submitted onto botlist.space.
 * @class
 * @extends {Base}
 */
class Bot extends Base {
    /**
     * @param {object} bot The plain bot object, fetched from the API.
     */
    constructor(bot) {
        super(bot);

        Object.defineProperty(this, 'bot', { writable: true, enumerable: false });

        /**
         * The plain bot object itself.
         * @type {object}
         */
        this.bot = bot;

        /**
         * The avatar URL of the bot.
         * @type {string}
         */
        this.avatar = bot.avatar;

        /**
         * The discriminator of the bot.
         * @type {string}
         */
        this.discriminator = bot.discriminator;

        /**
         * The bot's full description, if any.
         * @type {?string}
         */
        this.fullDescription = bot.full_description;

        /**
         * The amount of guilds the bot is currently in, if the owner posted anything.
         * @type {?number}
         */
        this.guildSize = bot.server_count;

        /**
         * Returns the bot's invite URL.
         * @type {string}
         */
        this.inviteURL = bot.invite;

        /**
         * Whether or not the bot is approved.
         * @type {boolean}
         */
        this.isApproved = bot.approved;

        /**
         * Whether or not the bot's avatar is marked as child friendly.
         * @type {boolean}
         */
        this.isChildFriendly = bot.avatarChildFriendly;

        /**
         * Whether or not the bot is featured on the front page.
         * @type {boolean}
         */
        this.isFeatured = bot.featured;

        /**
         * The bot's library that was used for its production.
         * @type {string}
         */
        this.library = bot.library;

        /**
         * The bot's prefix.
         * @type {string}
         */
        this.prefix = bot.prefix;

        /**
         * Identical to {@link Bot#guildSize}
         * @type {?number}
         */
        this.serverCount = this.guildSize || null;

        /**
         * If any, an array of the bot's guild count for each of its shard.
         * @type {?number[]}
         */
        this.shards = bot.shards || null;

        /**
         * The short description of the bot.
         * @type {string}
         */
        this.shortDescription = bot.short_description;

        /**
         * The bot's support code, if any.
         * @type {?string}
         */
        this.supportCode = bot.links.support;

        /**
         * The bot's timestamp in which it was submitted to the site.
         * @type {number}
         */
        this.timestamp = new Date(bot.timestamp).getTime();

        /**
         * The username of the bot.
         * @type {string}
         */
        this.username = bot.username;

        /**
         * If any, the bot's vanity.
         * @type {?string}
         */
        this.vanity = bot.vanity;
    }

    /**
     * Returns the bot's invite URL with no permissions.
     * @type {string}
     */
    get inviteNoPerms() {
        return this.inviteURL.replace(/&permissions=[0-9]*/gi, '');
    }

    /**
     * Returns the bot's support URL, if the support code exists.
     * @type {?string}
     */
    get supportURL() {
        if (!this.supportCode) return null;
        return `https://discord.gg/${this.supportCode}`;
    }

    /**
     * The tag of the bot.
     * @type {string}
     */
    get tag() {
        return `${this.username}#${this.discriminator}`;
    }

    /**
     * Returns the bot's page URL.
     * @type {string}
     */
    get url() {
        return `https://botlist.space/bot/${this.id}`;
    }

    /**
     * Returns the bot's vanity in the form of a URL, if the bot has a vanity.
     * @type {?string}
     */
    get vanityURL() {
        if (!this.vanity) return null;
        return `https://botlist.space/bot/${this.vanity}`;
    }

    /**
     * Fetches all of the bot's owners, including the secondary ones.
     * @param {FetchOptions} [options={}] Fetch Options.
     * @returns {PartialUser[]} An array of the bot's owners.
     * @example
     * Bot.owners({ specified: 'username' })
     *  .then(owners => console.log(`The bot owners' usernames are ${owners}`))
     *  .catch(console.log);
     */
    owners(options = {}) {
        if (options !== Object(options) || options instanceof Array) throw new TypeError('options must be an object.');
        const Options = new FetchOptions(options);

        if (Options.normal) {
            return Options.specified ? this.bot.owners.map(owner => owner[Options.specified]) : this.bot.owners;
        } else {
            const Owners = Options.stringify ? this.bot.owners.map(owner => new PartialUser(owner).toString()) : this.bot.owners.map(owner => new PartialUser(owner));
            const resolved = Options.specified ? Owners.map(owner => owner[Options.specified]) : Owners;
            return resolved;
        }
    }

    /**
     * Returns the bot's mention, rather than the bot object.
     * @returns {string} The bot mention.
     * @example
     * console.log(`Hey look a random boat ${Bot}`); // Hey look a random boat <@1039280320983029>
     */
    toString() {
        return `<@${this.id}>`;
    }
}

exports.Bot = Bot;
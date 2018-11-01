const FetchOptions = require('./FetchOptions').FetchOptions;
const Base = require('./Base').Base;
const User = require('./User');
const util = require('util');

/**
 * Represents any bot that has been submitted onto botlist.space.
 * @class
 * @constructor
 * @extends {Base}
 */
class Bot extends Base {
    /**
     * @param {Object} bot The plain bot object, fetched from the API.
     */
    constructor(bot) {
        super(bot);

        /**
         * The avatar of the bot.
         * @type {String}
         */
        this.avatar = bot.avatar;

        /**
         * The plain bot object itself.
         * @type {Object}
         */
        this.bot = bot;

        /**
         * The discriminator of the bot.
         * @type {String}
         */
        this.discriminator = bot.discriminator;

        /**
         * The bot's full description, if any.
         * @type {String|null}
         */
        this.fullDescription = bot.full_description;

        /**
         * The amount of guilds the bot is currently in, if the owner posted anything.
         * @type {Number|null}
         */
        this.guildSize = bot.count;

        /**
         * Returns the bot's invite URL.
         * @type {String}
         */
        this.inviteURL = bot.invite;

        /**
         * Whether or not the bot is approved.
         * @type {Boolean}
         */
        this.isApproved = bot.approved;

        /**
         * Whether or not the bot's avatar is marked as child friendly.
         * @type {Boolean}
         */
        this.isChildFriendly = bot.avatarChildFriendly;

        /**
         * Whether or not the bot is featured on the front page.
         * @type {Boolean}
         */
        this.isFeatured = bot.featured;

        /**
         * The bot's library that was used for its production.
         * @type {String}
         */
        this.library = bot.library;

        /**
         * The bot's prefix.
         * @type {String}
         */
        this.prefix = bot.prefix;

        /**
         * Identical to {@link Bot#guildSize}
         * @type {Number|null}
         */
        this.serverCount = this.guildSize;

        /**
         * Returns, if any, an array of the bot's guild count for each of its shard.
         * @type {Array<Number>|null}
         */
        this.shards = bot.shards;

        /**
         * The short description of the bot.
         * @type {String}
         */
        this.shortDescription = bot.short_description;

        /**
         * The bot's support code, if any.
         * @type {String|null}
         */
        this.supportCode = bot.links.support;

        /**
         * The tag of the bot.
         * @type {String}
         */
        this.tag = `${this.username}#${this.discriminator}`;

        /**
         * The bot's timestamp in which it was submitted to the site.
         * @type {Number}
         */
        this.timestamp = bot.timestamp;

        /**
         * The username of the bot.
         * @type {String}
         */
        this.username = bot.username;

        /**
         * Returns, if any, the bot's vanity.
         * @type {String}
         */
        this.vanity = bot.vanity;
    }

    /**
     * Returns the bot's invite URL with no permissions.
     * @type {String}
     */
    get inviteNoPerms() {
        return this.inviteURL.replace(/&permissions=[0-9]*/gi, '');
    }

    /**
     * Returns the bot's support URL, if the support code exists.
     * @type {String|null}
     */
    get supportURL() {
        if (!this.supportCode) return null;
        return `https://discord.gg/${this.supportCode}`;
    }

    /**
     * Returns the bot's vanity in the form of a URL, if the bot has a vanity.
     * @type {String|null}
     */
    get vanityURL() {
        if (!this.vanity) return null;
        return `https://botlist.space/bot/${this.vanity}`;
    }

    /**
     * Fetches all of the bot's owners, including the secondary ones.
     * @param {FetchOptions} [options={}] Fetch Options.
     * @returns {Array<User.User>} An array of the bot's owners.
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
            const Owners = this.bot.owners.map(owner => new User.User(owner));
            return Options.specified ? Owners.map(owner => owner[Options.specified]) : Owners;
        }
    }

    /**
     * Returns the bot's mention, rather than the bot object.
     * @type {String}
     * @example
     * console.log(`Hey look a random boat ${Bot}`); // Hey look a random boat <@1039280320983029>
     */
    toString() {
        return `<@${this.id}>`;
    }

    /**
     * @deprecated Use {@link Bot#inviteURL} or {@link Bot#inviteNoPerms}
     */
    invite() {
        return this.inviteURL;
    }

    /**
     * @deprecated Use {@link Bot#supportCode} or {@link Bot#supportURL}
     */
    support() {
        return this.supportURL;
    }
}

Bot.prototype.invite = util.deprecate(Bot.prototype.invite, 'Bot#invite() => Use Bot#inviteURL or Bot#inviteNoPerms');
Bot.prototype.support = util.deprecate(Bot.prototype.support, 'Bot#support => Use Bot#supportCode or Bot#supportURL');

exports.Bot = Bot;
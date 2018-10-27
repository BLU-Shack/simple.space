const FetchOptions = require('./FetchOptions').FetchOptions;
const NonGuildBase = require('./bases/NonGuildBase').NonGuildBase;
const User = require('./User');

/**
 * Represents any bot that has been submitted onto botlist.space.
 * @class
 * @extends {NonGuildBase}
 */
class Bot extends NonGuildBase {
    /**
     * @constructor
     * @param {Object} bot The plain bot object, fetched from the API.
     */
    constructor(bot) {
        super(bot);

        /**
         * The plain bot object itself.
         * @type {Object}
         */
        this.bot = bot;

        /**
         * Whether or not the bot's avatar is child friendly.
         * @type {Boolean}
         */
        this.isChildFriendly = bot.avatarChildFriendly;

        /**
         * Whether or not the bot has been approved by the mods.
         * @type {Boolean}
         */
        this.isApproved = bot.approved;

        /**
         * Whether or not the bot is featured on the front page.
         * @type {Boolean}
         */
        this.isFeatured = bot.featured;

        /**
         * The bot's default prefix.
         * @type {String}
         */
        this.prefix = bot.prefix;

        /**
         * The bot's library/language.
         * @type {String}
         */
        this.library = bot.library;

        /**
         * The bot's full description, if any is set.
         * @type {String|null}
         */
        this.fullDescription = bot.full_description;

        /**
         * The bot's timestamp in which it was submitted.
         * @type {Number}
         */
        this.timestamp = new Date(bot.timestamp).getTime();

        /**
         * The bot's vanity, if any.
         * @type {String|null}
         */
        this.vanity = bot.vanity || null;

        /**
         * The bot's server size, if any.
         * @type {Number|null}
         */
        this.serverCount = bot.server_count;

        /**
         * The bot's shards array, if passed.
         * @type {Array<Number>|null}
         */
        this.shards = bot.shards || null;
    }

    /**
     * Retreives the invite URL of the bot.
     * @param {Boolean} [perms=true] Whether or not to return the invite link with set permissions.
     * @returns {String} The invite URL for inviting the bot to your server.
     */
    invite(perms = true) {
        return !perms ? this.bot.invite.replace(/&permissions=[0-9]*/gi, '') : this.bot.invite;
    }

    /**
     * Fetch the bot's support server invite.
     * @param {Boolean} [code=false] Whether or not to return only the plain code.
     * @returns {String} The support server's invite URL or code, if any.
     */
    support(code = false) {
        if (!this.bot.links.support) return null;
        return code ? this.bot.links.support : `https://discord.gg/${this.bot.links.support}`;
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
}

exports.Bot = Bot;
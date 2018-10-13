const Base = require('./Base');
const User = require('./User');
const FetchOptions = require('./FetchOptions');

class Bot extends Base {
    constructor(bot) {
        super(bot);
        /** @type {String} */
        const SpaceBot = bot;
        this.bot = SpaceBot;

        /** @type {Boolean} */
        const friendly = bot.avatarChildFriendly;
        this.childFriendly = friendly;

        /** @type {Boolean} */
        const approved = bot.approved;
        this.approved = approved;

        /** @type {String} */
        const avatar = bot.avatar;
        this.avatar = avatar;

        /** @type {Boolean} */
        const featured = bot.featured;
        this.featured = featured;

        /** @type {String} */
        const discriminator = bot.discriminator;
        this.discriminator = discriminator;

        /** @type {String} */
        const username = bot.username;
        this.username = username;

        /** @type {string} */
        const tag = `${this.username}#${this.discriminator}`;
        this.tag = tag;

        /** @type {String} */
        const prefix = bot.prefix;
        this.prefix = prefix;

        /** @type {String} */
        const library = bot.library;
        this.library = library;

        /** @type {String} */
        const short = bot.short_description;

        /** @type {String} */
        const long = bot.full_description;

        /** @type {String} */
        const type = bot.type;

        this.description = { short, long, type };

        /** @type {Date} */
        const timestamp = new Date(bot.timestamp);
        this.timestamp = timestamp.getTime();

        /** @type {String} */
        const vanity = bot.vanity;
        this.vanity = vanity;
    }

    /**
     * Returns the bot mention.
     * @returns {String} The bot mention.
     */
    toString() {
        return `<@${this.id}>`;
    }

    /**
     * Get the invite link for the bot.
     * @param {Boolean} perms Whether or not to return the invite link with set permissions.
     * @returns {String} The invite link.
     */
    invite(perms = true) {
        return !perms ? this.bot.invite.replace(/&permissions=[0-9]*/gi, '') : this.bot.invite;
    }

    /**
     * Get the support link for the bot.
     * @param {Boolean} code Whether or not to return only the plain code.
     * @returns {String} The support link.
     */
    support(code = false) {
        if (!this.bot.links.support) return null;
        return code ? this.bot.links.support : `https://discord.gg/${this.bot.links.support}`;
    }

    /**
     * Get the bot owners.
     * @param {FetchOptions} options Fetch options.
     * @returns {Array<User>} An array of owners.
     */
    owners(options = {}) {
        if (options !== Object(options) || options instanceof Array) throw new TypeError('options must be an object.');
        const Options = new FetchOptions(options);

        if (Options.normal) {
            return Options.specified ? this.bot.owners.map(owner => owner[Options.specified]) : this.bot.owners;
        } else {
            const Owners = this.bot.owners.map(owner => new User(owner));
            return Options.specified ? Owners.map(owner => owner[Options.specified]) : Owners;
        }
    }
}

module.exports = Bot;
const NonGuildBase = require('./bases/NonGuildBase');
const User = require('./User');
const FetchOptions = require('./FetchOptions');

/**
 * Represents any bot that has been submitted onto botlist.space.
 * @extends {NonGuildBase}
 */
class Bot extends NonGuildBase {
    /**
     * @param {Object} bot The bot object, fetched from the API.
     * @property {Object} bot The plain bot object itself.
     * @property {Boolean} childFriendly Whether or not the bot's avatar is NSFW.
     * @property {Boolean} approved Whether or not the bot has been approved.
     * @property {Boolean} featured Whether or not the bot is featured on the front page.
     * @property {String} prefix The bot's main prefix.
     * @property {String} library The bot's library/framework.
     * @property {String} shortDescription The bot's short description.
     * @property {String|null} fullDescription The bot's full description, if any.
     * @property {Number} timestamp The timestamp in which the bot has been accepted.
     * @property {String|null} vanity The bot's vanity, if any.
     */
    constructor(bot) {
        super(bot);

        this.bot = bot;

        this.childFriendly = bot.avatarChildFriendly;

        this.approved = bot.approved;

        this.featured = bot.featured;

        this.prefix = bot.prefix;

        this.library = bot.library;

        this.shortDescription = bot.short_description;

        this.fullDescription = bot.full_description;

        this.timestamp = new Date(bot.timestamp).getTime();

        this.vanity = bot.vanity;
    }

    /**
     * Get the invite link for the bot.
     * @param {Boolean} [perms=true] Whether or not to return the invite link with set permissions.
     * @returns {String} The invite URL for inviting the bot to your server.
     */
    invite(perms = true) {
        return !perms ? this.bot.invite.replace(/&permissions=[0-9]*/gi, '') : this.bot.invite;
    }

    /**
     * Get the support server invite URL/code for the bot.
     * @param {Boolean} [code=false] Whether or not to return only the plain code.
     * @returns {String} The support server invite URL/code or null, if there is no link.
     */
    support(code = false) {
        if (!this.bot.links.support) return null;
        return code ? this.bot.links.support : `https://discord.gg/${this.bot.links.support}`;
    }

    /**
     * Get the bot's owners, including the secondary ones.
     * @param {FetchOptions} [options={}] Fetch options.
     * @returns {Array<User>} An array of the bot's owners.
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
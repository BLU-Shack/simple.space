const NonGuildBase = require('./bases/NonGuildBase');
const FetchOptions = require('./FetchOptions');
const Guild = require('./Guild');
const Bot = require('./Bot');

/**
 * Represents any user logged onto botlist.space.
 * @extends {NonGuildBase}
 */
class User extends NonGuildBase {
    /**
     * @param {Object} user The default user object from the API.
     * @property {Object} user The default user object received from fetching.
     * @property {String} [github] The user's github link, if any.
     * @property {String} [gitlab] The user's gitlab link, if any.
     * @property {String} [shortDescription] The user's description, if any.
     */
    constructor(user) {
        super(user);

        this.user = user;

        this.github = user.links.github;

        this.gitlab = user.links.gitlab;

        this.shortDescription = user.short_description;
    }

    /**
     * Fetches all bots that the user owns.
     * @param {FetchOptions} [options={}] Fetch options.
     * @returns {Array<Bot>} An array of bots.
     */
    bots(options = {}) {
        console.warn('We have some technical difficulties here.');
        if (options !== Object(options) || options instanceof Array) throw new TypeError('options must be an object.');
        const Options = new FetchOptions(options);

        if (Options.normal) {
            return Options.specified ? this.user.bots.map(bot => bot[Options.specified]) : this.user.bots;
        } else {
            console.log(Bot instanceof constructor);
            const Bots = this.user.bots.map(bot => new Bot(bot));
            return Options.specified ? Bots.map(bot => bot[Options.specified]) : Bots;
        }
    }

    /**
     * Fetches all guilds that the user owns.
     * @param {FetchOptions} [options={}] Fetch options.
     * @returns {Array<Guild>} An array of guilds.
     */
    guilds(options = {}) {
        if (options !== Object(options) || options instanceof Array) throw new TypeError('options must be an object.');
        const Options = new FetchOptions(options);

        if (Options.normal) {
            return Options.specified ? this.user.servers.map(guild => guild[Options.specified]) : this.user.servers;
        } else {
            const Guilds = this.user.servers.map(guild => new Guild(guild));
            return Options.specified ? Guilds.map(owner => owner[Options.specified]) : Guilds;
        }
    }
}

module.exports = User;
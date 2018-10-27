const NonGuildBase = require('./bases/NonGuildBase.js').NonGuildBase;
const FetchOptions = require('./FetchOptions').FetchOptions;
const Guild = require('./Guild.js');
const Bot = require('./Bot.js');

/**
 * Represents any user logged onto botlist.space.
 * @class
 * @extends {NonGuildBase}
 */
class User extends NonGuildBase {
    /**
     * @constructor
     * @param {Object} user The plain user object from the API.
     */
    constructor(user) {
        super(user);

        /**
         * The plain user object itself.
         * @type {Object}
         */
        this.user = user;

        /**
         * The user's GitHub username, if any is available.
         * @type {String|null}
         */
        this.github = user.links.github;

        /**
         * The user's GitLab username, if any is available.
         * @type {String|null}
         */
        this.gitlab = user.links.gitlab;
    }

    /**
     * Fetches all bots that the user owns.
     * @param {FetchOptions} [options={}] Fetch options.
     * @returns {Array<Bot.Bot>} An array of bots.
     * @example
     * User.bots({ specified: 'username' })
     *  .then(bots => console.log(`${User.tag}'s bots are: ${bots}`))
     *  .catch(console.log);
     */
    bots(options = {}) {
        if (options !== Object(options) || options instanceof Array) throw new TypeError('options must be an object.');
        const Options = new FetchOptions(options);

        if (Options.normal) {
            return Options.specified ? this.user.bots.map(bot => bot[Options.specified]) : this.user.bots;
        } else {
            const Bots = this.user.bots.map(bot => new Bot.Bot(bot));
            return Options.specified ? Bots.map(bot => bot[Options.specified]) : Bots;
        }
    }

    /**
     * Fetches all guilds that the user owns.
     * @param {FetchOptions} [options={}] Fetch options.
     * @returns {Array<Guild.Guild>} An array of guilds.
     * @example
     * User.guilds({ specified: 'name' })
     *  .then(guilds => console.log(`${User.tag}'s servers are: ${guilds}`))
     *  .catch(console.log);
     */
    guilds(options = {}) {
        if (options !== Object(options) || options instanceof Array) throw new TypeError('options must be an object.');
        const Options = new FetchOptions(options);

        if (Options.normal) {
            return Options.specified ? this.user.servers.map(guild => guild[Options.specified]) : this.user.servers;
        } else {
            const Guilds = this.user.servers.map(guild => new Guild.Guild(guild));
            return Options.specified ? Guilds.map(owner => owner[Options.specified]) : Guilds;
        }
    }
}

exports.User = User;
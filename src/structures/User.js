const FetchOptions = require('./FetchOptions').FetchOptions;
const Guild = require('./Guild.js').Guild;
const Bot = require('./Bot.js').Bot;
const PartialUser = require('./PartialUser.js').PartialUser;

/**
 * Represents any user logged onto botlist.space.
 * @class
 * @constructor
 * @extends {PartialUser}
 */
class User extends PartialUser {
    /**
     * @param {Object} user The plain user object from the API.
     */
    constructor(user) {
        super(user);
    }

    /**
     * Fetches all bots that the user owns.
     * @param {FetchOptions} [options={}] Fetch options.
     * @returns {Array<Bot>} An array of bots.
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
            const Bots = this.user.bots.map(bot => new Bot(bot));
            const resolved = Options.stringify ? Bots.map(bot => bot.toString()) : Bots;
            return resolved;
        }
    }

    /**
     * Fetches all guilds that the user owns.
     * @param {FetchOptions} [options={}] Fetch options.
     * @returns {Array<Guild>} An array of guilds.
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
            const Guilds = this.user.servers.map(guild => new Guild(guild));
            const resolved = Options.stringify ? Guilds.map(guild => guild.toString()) : Guilds;
            return resolved;
        }
    }
}

exports.User = User;
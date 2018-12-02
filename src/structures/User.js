const { Bot, FetchOptions, Guild, PartialUser } = require('./Classes.js').Classes;

/**
 * Represents any user logged onto botlist.space.
 * @class
 * @extends {PartialUser}
 */
class User extends PartialUser {
	/**
     * @param {object} user The plain user object from the API.
     */
	constructor(user) {
		super(user);
	}

	/**
     * Fetches all bots that the user owns.
     * @param {FetchOptions} [options={}] Fetch options.
     * @returns {Bot[]} An array of bots.
     * @example
     * User.bots({ specified: 'username' })
     *     .then(bots => console.log(`${User.tag}'s bots are: ${bots}`))
     *     .catch(console.log);
     */
	bots(options = {}) {
		if (options !== Object(options) || options instanceof Array) throw new TypeError('options must be an object.');
		const { normal, specified, log, stringify } = new FetchOptions(options);

		const all = !normal ? this.user.bots.map(bot => new Bot(bot)) : this.user.bots;
		const resolved = all.map(bot => specified ? bot[specified] : stringify ? bot.toString() : bot);
		if (log) console.log(resolved);
		return resolved;
	}

	/**
     * Fetches all guilds that the user owns.
     * @param {FetchOptions} [options={}] Fetch options.
     * @returns {Guild[]} An array of guilds.
     * @example
     * User.guilds({ specified: 'name' })
     *     .then(guilds => console.log(`${User.tag}'s servers are: ${guilds}`))
     *     .catch(console.log);
     */
	guilds(options = {}) {
		if (options !== Object(options) || options instanceof Array) throw new TypeError('options must be an object.');
		const { normal, specified, log, stringify } = new FetchOptions(options);

		const all = !normal ? this.user.servers.map(guild => new Guild(guild)) : this.user.servers;
		const resolved = all.map(guild => specified ? guild[specified] : stringify ? guild.toString() : guild);
		if (log) console.log(resolved);
		return resolved;
	}
}

exports.User = User;
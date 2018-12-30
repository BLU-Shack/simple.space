const Base = require('./Base.js');

/**
 * Represents any user logged onto botlist.space.
 * @class
 * @extends {Base}
 */
class User extends Base {
	/**
     * @param {object} obj The plain user object from the API.
     */
	constructor(obj) {
		super(obj);
		this.avatar = obj.avatar;
		this.description = obj.short_description;
		this.discriminator = obj.discriminator;
		this.id = obj.id;
		this.username = obj.username;

		Object.defineProperty(this, 'bots', { get: () => {
			if (!obj.bots) return null;
			const Bot = require('./Bot.js');
			return obj.bots.map(u => new Bot(u));
		}, enumerable: true });
	}

	get page() {
		return `https://botlist.space/user/${this.id}`;
	}

	get tag() {
		return `${this.username}#${this.id}`;
	}

	toString() {
		return `<@${this.id}>`;
	}
}

module.exports = User;
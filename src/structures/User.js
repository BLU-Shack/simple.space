const Base = require('./Base.js');

/**
 * Represents any user logged onto botlist.space.
 * @class
 * @extends {Base}
 */
class User extends Base {
	constructor(obj) {
		super(obj);

		/**
		 * The user's avatar URL.
		 * @type {string}
		 */
		this.avatar = obj.avatar;

		/**
		 * The user's description on the site.
		 * @type {?string}
		 */
		this.description = obj.short_description;

		/**
		 * The user's 4 digits.
		 * @type {string}
		 */
		this.discriminator = obj.discriminator;

		/**
		 * The user's Discord ID.
		 * @type {string}
		 */
		this.id = obj.id;

		/**
		 * The user's Discord username.
		 * @type {string}
		 */
		this.username = obj.username;
	}

	/**
	 * The user's page on the site.
	 * @readonly
	 * @type {string}
	 */
	get page() {
		return `https://botlist.space/user/${this.id}`;
	}

	/**
	 * The user's Discord Tag.
	 * @readonly
	 * @type {string}
	 */
	get tag() {
		return `${this.username}#${this.discriminator}`;
	}

	/**
	 * Returns text that Discord recognizes as a user mention.
	 * @type {string}
	 */
	toString() {
		return `<@${this.id}>`;
	}
}

module.exports = User;
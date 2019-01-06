const { Base, User } = require('.');

/**
 * Resembles an upvote from the `/bots/:id/upvotes` endpoint.
 * @extends {Base}
 */
class Upvote extends Base {
	/**
	 * @param {object} obj
	 */
	constructor(obj) {
		super(obj);

		/**
		 * The user that upvoted.
		 * @type {User}
		 */
		this.user = new User(obj.user);

		/**
		 * The timestamp in which the upvote took place.
		 * @type {number}
		 */
		this.timestamp = obj.timestamp;
	}

	/**
	 * Returns text that Discord recognizes as a user mention.
	 * @type {string}
	 */
	toString() {
		return `<@${this.user.id}>`;
	}
}

module.exports = Upvote;
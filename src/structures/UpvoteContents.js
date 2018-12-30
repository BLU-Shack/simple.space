const { User, Base } = require('.');

/**
 * Represents the contents of a user who has upvoted a bot/guild.
 * @extends {Base}
 */
class UpvoteContents extends Base {
	/**
     * @param {object} body The user contents.
     */
	constructor(body) {
		super();
		/**
         * The timestamp in which the user upvoted.
         * @type {number}
         */
		this.timestamp = body.timestamp;

		/**
         * Just the user.
         * @type {User}
         */
		this.user = new User(body.user);
	}
}

module.exports = UpvoteContents;
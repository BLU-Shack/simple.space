const PartialUser = require('./User.js');

/**
 * Represents the contents of a user who has upvoted a bot/guild.
 * @class
 */
class UpvoteContents {
	/**
     * @param {object} body The user contents.
     */
	constructor(body) {
		/**
         * The timestamp in which the user upvoted.
         * @type {number}
         */
		this.timestamp = body.timestamp;

		/**
         * Just the user.
         * @type {PartialUser}
         */
		this.user = new PartialUser(body.user);
	}
}

module.exports = UpvoteContents;
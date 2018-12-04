const PartialUser = require('./PartialUser.js').PartialUser;

/**
 * A class that is used for fetching user upvotes.
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

exports.UpvoteContents = UpvoteContents;
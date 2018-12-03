const WebhookUser = require('./WebhookUser.js').WebhookUser;

/**
 * The webhook info POSTed through the Webhook class.
 */
class WebhookInfo {
	/**
	 * @param {object} obj The contents of the POST.
	 */
	constructor(obj) {
		/**
		 * The bot/guild ID.
		 * @type {string}
		 */
		this.recipientID = obj.bot || obj.server;

		/**
		 * The timestamp in which the user upvoted.
		 * @type {number}
		 */
		this.timestamp = obj.timestamp;

		/**
		 * The user that upvoted.
		 * @type {WebhookUser}
		 */
		this.user = new WebhookUser(obj.user);
	}
}

exports.WebhookInfo = WebhookInfo;
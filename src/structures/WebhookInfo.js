const WebhookUser = require('./WebhookUser.js').WebhookUser;

class WebhookInfo {
	constructor(obj) {
		this.recipientID = obj.bot || obj.server;

		this.timestamp = obj.timestamp;

		this.user = new WebhookUser(obj.user);
	}
}

exports.WebhookInfo = WebhookInfo;
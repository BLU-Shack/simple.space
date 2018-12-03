class WebhookUser {
	constructor(user) {
		this.avatar = user.avatar;

		this.discriminator = user.discriminator;

		this.id = user.id;

		this.shortDescription = user.short_description;

		this.username = user.username;
	}

	get tag() {
		return this.user.tag;
	}
}

exports.WebhookUser = WebhookUser;
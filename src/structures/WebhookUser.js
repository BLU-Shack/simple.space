/**
 * Represents a user through a webhook POST.
 * @class
 */
class WebhookUser {
	/**
	 * @param {object} user The user contents from a webhook POST.
	 */
	constructor(user) {

		/**
		 * The plain user object itself.
		 * @name WebhookUser#user
		 * @readonly
		 * @type {object}
		 */
		Object.defineProperty(this, 'user', { value: user });

		/**
		 * The user's avatar URL.
		 * @type {string}
		 */
		this.avatar = user.avatar;

		/**
		 * The user's discriminator.
		 * @type {string}
		 */
		this.discriminator = user.discriminator;

		/**
		 * The user's ID.
		 * @type {string}
		 */
		this.id = user.id;

		/**
		 * The user's short description, if any.
		 * @type {?string}
		 */
		this.shortDescription = user.short_description;

		/**
		 * The user's username.
		 * @type {string}
		 */
		this.username = user.username;
	}

	/**
	 * The user's tag.
	 * @type {string}
	 */
	get tag() {
		return this.user.tag;
	}
}

exports.WebhookUser = WebhookUser;
const Base = require('./Base.js').Base;

/**
 * A user with limited information.
 * @class
 * @extends {Base}
 */
class PartialUser extends Base {
	/**
     * @param {object} partialUser The partial user fetched from the API.
     */
	constructor(partialUser) {
		super(partialUser);

		/**
         * The plain user object itself.
         * @name PartialUser#user
         * @readonly
         * @type {object}
         */
		Object.defineProperty(this, 'user', { value: partialUser });

		/**
         * The avatar of the user.
         * @type {string}
         */
		this.avatar = partialUser.avatar;

		/**
         * The discriminator of the user.
         * @type {string}
         */
		this.discriminator = partialUser.discriminator;

		/**
         * If any, the user's github username.
         * @type {?string}
         */
		this.githubUsername = partialUser.links.github;

		/**
         * If any, the user's gitlab username.
         * @type {?string}
         */
		this.gitlabUsername = partialUser.links.gitlab;

		/**
         * The short description of the user.
         * @type {?string}
         */
		this.shortDescription = partialUser.short_description || null;

		/**
         * The user's username.
         * @type {string}
         */
		this.username = partialUser.username;
	}

	/**
     * The user's github URL.
     * @readonly
     * @type {?string}
     */
	get githubURL() {
		if (!this.githubUsername) return null;
		return `https://github.com/${this.githubUsername}`;
	}

	/**
     * The user's gitlab URL.
     * @readonly
     * @type {?string}
     */
	get gitlabURL() {
		if (!this.gitlabUsername) return null;
		return `https://gitlab.com/${this.gitlabUsername}`;
	}

	/**
     * The user's tag.
     * @readonly
     * @type {string}
     */
	get tag() {
		return `${this.username}#${this.discriminator}`;
	}

	/**
     * Returns the user's page URL.
     * @readonly
     * @type {string}
     */
	get url() {
		return `https://botlist.space/user/${this.id}`;
	}

	/**
     * Returns the user's mention, rather than the user object.
     * @returns {string} The user mention.
     * @example console.log(`Hey look a random user ${user}`) // Hey look a random user <@235593018332282884>
     */
	toString() {
		return `<@${this.id}>`;
	}
}

exports.PartialUser = PartialUser;
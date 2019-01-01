const { Base, User } = require('.');
const util = require('util'); // eslint-disable-line no-unused-vars

/**
 * Represents any bot that has been submitted onto botlist.space.
 * @extends {Base}
 */
class Bot extends Base {
	constructor(obj) {
		super(obj);

		/**
		 * Whether or not the bot has been approved by the devs.
		 * @type {boolean}
		 */
		this.approved = obj.approved;

		/**
		 * The bot's avatar URL.
		 * @type {string}
		 */
		this.avatar = obj.avatar;

		/**
		 * Whether or not the bot has been certified.
		 * @type {boolean}
		 */
		this.certified = obj.certified;

		/**
		 * Whether or not the bot's avatar is child friendly
		 * @type {boolean}
		 */
		this.childFriendlyAvatar = obj.avatar_child_friendly;

		/**
		 * The timestamp of the bot's creation date.
		 * @type {number}
		 */
		this.createdAt = obj.created_at;

		/**
		 * The bot's 4 digits.
		 * @type {string}
		 */
		this.discriminator = obj.discriminator;

		/**
		 * The bot's full description on the site.
		 * @type {?string}
		 */
		this.fullDescription = obj.full_description;

		/**
		 * The bot's ID.
		 * @type {string}
		 */
		this.id = obj.id;

		/**
		 * The bot's invite URL.
		 * @type {string}
		 */
		this.invite = obj.links.invite;

		/**
		 * The invite URL of the bot, with no permissions requested.
		 * @type {string}
		 */
		this.inviteNoPerms = obj.links.no_permission_invite;

		/**
		 * The prefix that the bot uses.
		 * @type {string}
		 */
		this.prefix = obj.prefix;

		/**
		 * The bot's total server count.
		 * @type {number}
		 */
		this.serverCount = obj.server_count;

		/**
		 * The bot's short description on the site.
		 * @type {string}
		 */
		this.shortDescription = obj.short_description;

		/**
		 * The bot's support server invite code.
		 * @type {?string}
		 */
		this.supportCode = obj.links.support;

		/**
		 * The timestamp of the bot's latest change on the site.
		 * @type {number}
		 */
		this.updatedAt = obj.updated_at;

		/**
		 * The bot's Discord username.
		 * @type {string}
		 */
		this.username = obj.username;

		/**
		 * The bot's vanity.
		 * @type {?string}
		 */
		this.vanity = obj.vanity;

		/**
		 * The owners of the bot.
		 * @type {?User[]}
		 */
		this.owners = obj.owners.map(i => new User(i));
	}

	/**
	 * The main owner of the bot.
	 * @readonly
	 * @type {?User}
	 */
	get owner() {
		if (!this.owners) return null;
		else return this.owners[0];
	}

	/**
	 * The bot's page on the site.
	 * @readonly
	 * @type {string}
	 */
	get page() {
		return `https://botlist.space/bot/${this.id}`;
	}

	/**
	 * The bot's secondary owners.
	 * @readonly
	 * @type {?User[]}
	 */
	get secondaryOwners() {
		if (!this.owners) return null;
		else return this.owners.slice(1);
	}

	/**
	 * The bot's shards.
	 * @readonly
	 * @type {?number[]}
	 */
	get shards() {
		return this.raw.shards;
	}

	/**
	 * The bot's support server invite URL.
	 * @readonly
	 * @type {?string}
	 */
	get supportURL() {
		if (!this.supportCode) return null;
		else return `https://discord.gg/${this.supportCode}`;
	}

	/**
	 * The bot's Discord Tag.
	 * @readonly
	 * @type {string}
	 */
	get tag() {
		return `${this.username}#${this.tag}`;
	}

	/**
	 * The bot's tags (flairs) on the site.
	 * @readonly
	 * @type {string[]}
	 */
	get tags() {
		return this.raw.tags;
	}

	/**
	 * The bot's vanity URL on the site.
	 * @readonly
	 * @type {?string}
	 */
	get vanityURL() {
		if (!this.vanity) return null;
		else return `https://botlist.space/bot/${this.vanity}`;
	}

	/**
	 * The amount of times the bot has been viewed by browsing users.
	 * @type {number[]}
	 */
	get views() {
		return this.raw.views.map(view => view.timestamp);
	}

	/**
	 * Returns text that Discord recognizes as a user mention.
	 * @returns {string}
	 */
	toString() {
		return `<@${this.id}>`;
	}
}

module.exports = Bot;
const Base = require('./Base.js');
const User = require('./User.js');
const util = require('util'); // eslint-disable-line no-unused-vars

/**
 * Represents any bot that has been submitted onto botlist.space.
 * @extends {Base}
 */
class Bot extends Base {
	/**
	 * @param {object} obj
	 */
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
		 * Whether or not the bot's avatar is child friendly
		 * @type {boolean}
		 */
		this.childFriendlyAvatar = obj.avatar_child_friendly;

		/**
		 * The timestamp of the bot's creation date.
		 * @type {number}
		 */
		this.createdTimestamp = obj.created_at;

		/**
		 * The bot's 4 digits.
		 * @type {string}
		 */
		this.discriminator = obj.discriminator;

		/**
		 * The bot's full description on botlist.space.
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
		 * The bot's short description on botlist.space.
		 * @type {string}
		 */
		this.shortDescription = obj.short_description;

		/**
		 * The bot's support server invite code.
		 * @type {?string}
		 */
		this.supportCode = obj.links.support;

		/**
		 * The timestamp of the bot's latest change on botlist.space.
		 * @type {number}
		 */
		this.lastUpdateTimestamp = obj.updated_at;

		/**
		 * The bot's Discord username.
		 * @type {string}
		 */
		this.username = obj.username;

		/**
		 * The bot's vanity.
		 * @type {?string}
		 */
		this.vanityCode = obj.vanity;
	}

	/**
	 * The Date of when the bot was created.
	 * @type {Date}
	 */
	get createdAt() {
		return new Date(this.createdTimestamp);
	}

	/**
	 * The main owner of the bot.
	 * @readonly
	 * @type {User}
	 */
	get owner() {
		return this.owners[0];
	}

	/**
	 * Users who can manage the Bot on botlist.space
	 * @readonly
	 * @type {User[]}
	 */
	get owners() {
		return this.raw.owners.map(owner => new User(owner));
	}

	/**
	 * The bot's page on botlist.space.
	 * @readonly
	 * @type {string}
	 */
	get page() {
		return `https://botlist.space/bot/${this.id}`;
	}

	/**
	 * The bot's secondary owners.
	 * @readonly
	 * @type {User[]}
	 */
	get secondaryOwners() {
		return this.owners.slice(1);
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
		return `${this.username}#${this.discriminator}`;
	}

	/**
	 * The bot's tags (flairs) on botlist.space.
	 * @readonly
	 * @type {string[]}
	 */
	get tags() {
		return this.raw.tags;
	}

	/**
	 * The bot's vanity URL on botlist.space.
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
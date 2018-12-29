const { Base } = require('.');
const util = require('util'); // eslint-disable-line no-unused-vars

/**
 * Represents any bot that has been submitted onto botlist.space.
 * @class
 * @extends {Base}
 */
class Bot extends Base {
	constructor(bot) {
		super(bot);

		this.approved = bot.approved;
		this.avatar = bot.avatar;
		this.childFriendlyAvatar = bot.avatar_child_friendly;
		this.createdAt = bot.created_at;
		this.discriminator = bot.discriminator;
		this.fullDescription = bot.full_description;
		this.invite = bot.links.invite;
		this.inviteCount = bot.invites;
		this.inviteNoPerms = bot.links.no_permission_invite;
		this.prefix = bot.prefix;
		this.serverCount = bot.server_count;
		this.supportCode = bot.links.support;
		this.updatedAt = bot.updated_at;
		this.upvotes = bot.upvotes;
		this.username = bot.username;
		this.vanity = bot.vanity;

		Object.defineProperty(this, 'owners', { get: () => {
			const User = require('./User.js');
			return bot.owners.map(i => new User(i));
		}, enumerable: true });
	}

	get shards() {
		return this.raw.shards;
	}

	get supportURL() {
		return `https://discord.gg/${this.supportCode}`;
	}

	get tag() {
		return `${this.username}#${this.tag}`;
	}

	get tags() {
		return this.raw.tags;
	}

	toString() {
		return `<@${this.id}>`;
	}
}

module.exports = Bot;
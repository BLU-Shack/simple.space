const { Base } = require('.');
const util = require('util'); // eslint-disable-line no-unused-vars

/**
 * Represents any bot that has been submitted onto botlist.space.
 * @extends {Base}
 */
class Bot extends Base {
	constructor(obj) {
		super(obj);

		this.approved = obj.approved;
		this.avatar = obj.avatar;
		this.childFriendlyAvatar = obj.avatar_child_friendly;
		this.createdAt = obj.created_at;
		this.discriminator = obj.discriminator;
		this.fullDescription = obj.full_description;
		this.id = obj.id;
		this.invite = obj.links.invite;
		this.inviteCount = obj.invites;
		this.inviteNoPerms = obj.links.no_permission_invite;
		this.prefix = obj.prefix;
		this.serverCount = obj.server_count;
		this.supportCode = obj.links.support;
		this.updatedAt = obj.updated_at;
		this.upvotes = obj.upvotes;
		this.username = obj.username;
		this.vanity = obj.vanity;

		Object.defineProperty(this, 'owners', { get: () => {
			if (!obj.owners) return null;
			const User = require('./User.js');
			return obj.owners.map(i => new User(i));
		}, enumerable: true });
	}

	get shards() {
		return this.raw.shards;
	}

	get page() {
		return `https://botlist.space/bot/${this.id}`;
	}

	get supportURL() {
		if (!this.supportCode) return null;
		else return `https://discord.gg/${this.supportCode}`;
	}

	get tag() {
		return `${this.username}#${this.tag}`;
	}

	get tags() {
		return this.raw.tags;
	}

	get vanityURL() {
		if (!this.vanity) return null;
		else return `https://botlist.space/bots/${this.vanity}`;
	}

	toString() {
		return `<@${this.id}>`;
	}
}

module.exports = Bot;
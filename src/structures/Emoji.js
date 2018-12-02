const { Base, Guild } = require('./Classes.js').Classes;

/**
 * Represents any emoji on botlist.space.
 * @class
 * @extends {Base}
 */
class Emoji extends Base {
	/**
     * @param {object} emoji The emoji object fetched from the API.
     */
	constructor(emoji) {
		super(emoji);

		/**
         * The plain emoji object itself.
         * @name Emoji#emoji
         * @readonly
         * @type {object}
         */
		Object.defineProperty(this, 'emoji', { value: emoji });

		/**
         * Whether or not the emoji is animated.
         * @type {boolean}
         */
		this.animated = emoji.animated;

		/**
         * The emoji's name.
         * @type {string}
         */
		this.name = emoji.name;

		/**
         * The emoji's image URL.
         * @type {string}
         */
		this.imageURL = emoji.url;
	}

	/**
     * The plain guild object the emoji is in.
     * @readonly
     * @type {object}
     */
	get normalGuild() {
		return this.emoji.server;
	}

	/**
     * The guild the emoji is in.
     * @readonly
     * @type {Guild}
     */
	get guild() {
		return new Guild(this.normalGuild);
	}

	/**
     * Returns the raw text that turns into a Discord Readable Emoji when used correctly.
     * @readonly
     * @type {string}
     */
	get raw() {
		return `<${this.animated ? 'a' : ''}:${this.name}:${this.id}>`;
	}

	/**
     * The emoji's page URL.
     * @readonly
     * @type {string}
     */
	get url() {
		return `https://botlist.space/emoji/${this.id}`;
	}

	/**
     * Returns the text that forms a readable Discord emoji in discord messages.
     * @returns {string} Returns just {@link Emoji#raw}
     * @example channel.send(`Hey look there's an emoji ${emoji}`); // Varies depending on the emoji.
     */
	toString() {
		return this.raw;
	}
}

exports.Emoji = Emoji;
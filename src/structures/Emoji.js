const Base = require('./Base.js').Base;
const Guild = require('./Guild.js').Guild;

/**
 * Represents any emoji on botlist.space.
 * @class
 * @extends {Base}
 */
class Emoji extends Base {
    /**
     * @param {Object} emoji The emoji object fetched from the API.
     */
    constructor(emoji) {
        super(emoji);

        Object.defineProperty(this, 'emoji', { writable: true, enumerable: false });

        /**
         * The plain emoji object itself.
         * @type {Object}
         */
        this.emoji = emoji;

        /**
         * Whether or not the emoji is animated.
         * @type {Boolean}
         */
        this.animated = emoji.animated;

        /**
         * The emoji's name.
         * @type {String}
         */
        this.name = emoji.name;

        /**
         * The emoji's image URL.
         * @type {String}
         */
        this.imageURL = emoji.url;
    }

    /**
     * The plain guild object the emoji is in.
     * @type {Object}
     */
    get normalGuild() {
        return this.emoji.server;
    }

    /**
     * The guild the emoji is in.
     * @type {Guild}
     */
    get guild() {
        return new Guild(this.normalGuild);
    }

    /**
     * The emoji's page URL.
     * @type {String}
     */
    get url() {
        return `https://botlist.space/emoji/${this.id}`;
    }

    /**
     * Returns the text that forms a readable Discord emoji in discord messages.
     * @returns {String}
     */
    toString() {
        return `<${this.animated ? 'a' : ''}:${this.name}:${this.id}>`;
    }
}

exports.Emoji = Emoji;
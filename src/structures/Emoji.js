const Base = require('./Base.js').Base;

/**
 * Represents any emoji on botlist.space.
 * @class
 * @constructor
 * @extends {Base}
 */
class Emoji extends Base {
    /**
     * @param {Object} base The emoji object fetched from the API.
     */
    constructor(base) {
        super(base);

        /**
         * Whether or not the emoji is animated.
         * @type {Boolean}
         */
        this.animated = base.animated;

        /**
         * The plain emoji object itself.
         * @type {Object}
         */
        this.emoji = base;

        /**
         * The emoji's name.
         * @type {String}
         */
        this.name = base.name;

        /**
         * The emoji's guild ID it's in.
         * @type {String}
         */
        this.guildID = base.server;

        /**
         * The emoji's URL.
         * @type {String}
         */
        this.url = base.url;
    }

    toString() {
        return `<${this.animated ? 'a' : ''}:${this.name}:${this.id}>`;
    }
}

exports.Emoji = Emoji;
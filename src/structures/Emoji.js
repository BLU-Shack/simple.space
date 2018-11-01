const Base = require('./Base.js').Base;

/**
 * Represents any emoji on the site.
 * @class
 * @constructor
 * @extends {Base}
 */
class Emoji extends Base {
    /**
     * @constructor
     * @param {Object} base The Emoji object fetched from the API.
     */
    constructor(base) {
        super(base);

        /**
         * The plain emoji object.
         * @type {Object}
         */
        this.emoji = base;

        /**
         * The emoji's name.
         * @type {String}
         */
        this.name = base.name;

        /**
         * The guild ID in which the emoji comes from.
         * @type {String}
         */
        this.guildID = base.server;

        /**
         * The emoji's URL.
         * @type {String}
         */
        this.url = base.url;
    }
}

exports.Emoji = Emoji;
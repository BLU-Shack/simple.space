const Base = require('./Base').Base;

/**
 * Represents any Non-Guild object.
 * @class
 * @extends {Base}
 */
class NonGuildBase extends Base {
    /**
     * @param {Object} base Any Non-Guild object fetched from the API.
     */
    constructor(base) {
        super(base);
        /**
         * The Non-Guild's avatar URL.
         * @type {String}
         */
        this.avatar = base.avatar;
        /**
         * The Non-Guild's discriminator.
         * @type {String}
         */
        this.discriminator = base.discriminator;
        /**
         * The Non-Guild's username.
         * @type {String}
         */
        this.username = base.username;
        /**
         * The Non-Guild's tag.
         * @type {String}
         */
        this.tag = `${this.username}#${this.discriminator}`;
        /**
         * The Non-Guild's short description.
         * @type {String}
         */
        this.shortDescription = base.short_description;
    }
    /**
     * Returns a string containing the Non-Guild's mention.
     * @returns {String} The Non-Guild mention.
     */
    toString() {
        return `<@${this.id}>`;
    }
}

exports.NonGuildBase = NonGuildBase;
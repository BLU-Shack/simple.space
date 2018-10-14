const Base = require('./Base');

/**
 * The non-guild universal base for both Bot and User objects.
 * @extends {Base}
 */
class NonGuildBase extends Base {
    /**
     * @param {Object} base Any Non-Guild object fetched from the API.
     * @property {String} avatar The Non-Guild's avatar URL.
     * @property {String} discriminator The discriminator of the Non-Guild.
     * @property {String} username The username of the Non-Guild.
     * @property {String} tag The Non-Guild's tag.
     */
    constructor(base) {
        super(base);

        this.avatar = base.avatar;

        this.discriminator = base.discriminator;

        this.username = base.username;

        this.tag = `${this.username}#${this.discriminator}`;
    }
    /**
     * Returns a string containing the Non-Guild object's mention.
     * @returns {String} The Non-Guild mention.
     */
    toString() {
        return `<@${this.id}>`;
    }
}

module.exports = NonGuildBase;
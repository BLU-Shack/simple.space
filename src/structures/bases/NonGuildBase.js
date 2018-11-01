const Base = require('../Base').Base;
const util = require('util');

/**
 * Represents any Non-Guild object.
 * @class
 * @deprecated Now Deprecated; Not In Use
 * @extends {Base}
 */
class NonGuildBase extends Base {
    /**
     * @deprecated
     */
    constructor(base) {
        super(base);
        process.emitWarning('NonGuildBase is now deprecated, as it is no longer in use. All Bot/Emoji/Guild/User objects will now be using BASE. Do not use.', 'DeprecationWarning');

        /**
         * The avatar of the non-guild.
         * @type {String}
         */
        this.avatar = base.avatar;

        /**
         * The discriminator of the non-guild.
         * @type {String}
         */
        this.discriminator = base.discriminator;

        /**
         * The tag of the non-guild.
         * @type {String}
         */
        this.tag = `${this.username}#${this.discriminator}`;

        /**
         * The username of the non-guild.
         * @type {String}
         */
        this.username = base.username;

        /**
         * The short description of the non-guild.
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

NonGuildBase.prototype = util.deprecate(NonGuildBase, 'NonGuildBase is now deprecated. All Bot/Emoji/Guild/User objects will now be using BASE.');

exports.NonGuildBase = NonGuildBase;
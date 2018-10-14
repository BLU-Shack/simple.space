const Base = require('./bases/Base');
const FetchOptions = require('./FetchOptions');
const User = require('./User');

/**
 * Represents any guild that has been submitted onto botlist.space.
 * @extends {Base}
 */
class Guild extends Base {
    constructor(guild) {
        super(guild);
        this.guild = guild;

        /**
         * @type {Boolean}
         */
        const featured = guild.featured;
        this.featured = featured;

        /**
         * @type {String}
         */
        const icon = guild.icon;
        this.icon = icon;

        /**
         * @type {Boolean}
         */
        const childFriendly = guild.iconChildFriendly;
        this.childFriendly = childFriendly;

        /**
         * @type {Number}
         */
        const memberCount = guild.member_count;
        this.memberCount = memberCount;

        /**
         * @type {String}
         */
        const name = guild.name;
        this.name = name;

        /**
         * @type {Boolean}
         */
        const Public = guild.public;
        this.public = Public;

        /**
         * @type {Boolean}
         */
        const premium = guild.premium;
        this.premium = premium;

        /** @type {String} */
        const short = guild.short_description;
        this.shortDescription = short;

        /** @type {String} */
        const long = guild.full_description;
        this.fullDescription = long;

        /** @type {Date} */
        const date = new Date(guild.timestamp);
        this.timestamp = date.getTime();

        /** @type {String} */
        const vanity = guild.vanity;
        this.vanity = vanity;
    }

    /**
     * Returns a string containing the guild name.
     * @returns The guild name.
     */
    toString() {
        return this.name;
    }

    /**
     * Get the guild owners.
     * @param {FetchOptions} [options={}] Fetch options.
     * @returns {Array<User>} An array of owners.
     */
    owners(options = {}) {
        if (options !== Object(options) || options instanceof Array) throw new TypeError('options must be an object.');
        const Options = new FetchOptions(options);

        if (Options.normal) {
            return Options.specified ? this.guild.owners.map(owner => owner[Options.specified]) : this.guild.owners;
        } else {
            const Owners = this.guild.owners.map(owner => new User(owner));
            return Options.specified ? Owners.map(owner => owner[Options.specified]) : Owners;
        }
    }
}

module.exports = Guild;
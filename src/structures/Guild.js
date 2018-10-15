const Base = require('./bases/Base').Base;
const FetchOptions = require('./FetchOptions');
const User = require('./User');

/**
 * Represents any guild that has been submitted onto botlist.space.
 * @class
 * @extends {Base}
 */
class Guild extends Base {
    /**
     * @constructor
     * @param {Object} guild The guild object, fetched from the API.
     */
    constructor(guild) {
        super(guild);
        /**
         * The plain guild object itself.
         * @type {Object}
         */
        this.guild = guild;
        /**
         * Whether or not the guild is featured on the front page.
         * @type {Boolean}
         */
        this.featured = guild.featured;

        /**
         * The guild's icon URL.
         * @type {String}
         */
        this.icon = guild.icon;

        /**
         * Whether or not the guild's icon is child friendly.
         * @type {Boolean}
         */
        this.childFriendly = guild.iconChildFriendly;

        /**
         * How many members are in the Guild (estimate.)
         * @type {Number}
         */
        this.memberCount = guild.member_count;

        /**
         * The guild's name.
         * @type {String}
         */
        this.name = guild.name;

        /**
         * Whether or not the guild is public to everyone.
         * @type {Boolean}
         */
        this.public = guild.public;

        /**
         * Whether or not the guild is Premium.
         * @type {Boolean}
         */
        this.premium = guild.premium;

        /**
         * The guild's short description.
         * @type {String}
         */
        this.shortDescription = guild.short_description;

        /**
         * The guild's full description, if any.
         * @type {String|null}
         */
        this.fullDescription = guild.full_description;

        /**
         * The guild's timestamp, in which the guild had been submitted.
         * @type {Date}
         */
        this.timestamp = new Date(guild.timestamp).getTime();

        /**
         * The guild's vanity, if any.
         * @type {String|null}
         */
        this.vanity = guild.vanity;
    }

    /**
     * Returns a string containing the guild name.
     * @returns {String} The guild name.
     */
    toString() {
        return this.name;
    }

    /**
     * Get the guild's owners.
     * @param {FetchOptions} [options={}] Fetch options.
     * @returns {Array<User>} An array of the guild's owners.
     * @example
     * Guild.owners({ specified: 'username' })
     *  .then(owners => console.log(`The guild owners' usernames are: ${owners}`))
     *  .catch(console.log);
     */
    owners(options = {}) {
        if (options !== Object(options) || options instanceof Array) throw new TypeError('options must be an object.');
        const Options = new FetchOptions.FetchOptions(options);

        if (Options.normal) {
            return Options.specified ? this.guild.owners.map(owner => owner[Options.specified]) : this.guild.owners;
        } else {
            const Owners = this.guild.owners.map(owner => new User.User(owner));
            return Options.specified ? Owners.map(owner => owner[Options.specified]) : Owners;
        }
    }
}

exports.Guild = Guild;
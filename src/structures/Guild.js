const Base = require('./Base.js').Base;
const FetchOptions = require('./FetchOptions').FetchOptions;
const User = require('./User.js');

/**
 * Represents any guild that has been submitted onto botlist.space.
 * @class
 * @extends {Base}
 */
class Guild extends Base {
    /**
     * @constructor
     * @param {Object} guild The plain guild object, fetched from the API.
     */
    constructor(guild) {
        super(guild);

        /**
         * Whether or not the guild is in compliance with listing its emojis.
         * @type {Boolean}
         */
        this.compliance = guild.compliance;

        /**
         * The plain guild object itself.
         * @type {Object}
         */
        this.guild = guild;

        /**
         * Whether or not the guild is featured on the front page.
         * @type {Boolean}
         */
        this.isFeatured = guild.featured;

        /**
         * The guild's icon URL.
         * @type {String}
         */
        this.icon = guild.icon;

        /**
         * Whether or not the guild's icon is marked as child friendly.
         * @type {Boolean}
         */
        this.isChildFriendly = guild.iconChildFriendly;

        /**
         * The number of members there currently are in the Guild
         * @type {Number}
         */
        this.memberCount = guild.member_count;

        /**
         * The guild's name.
         * @type {String}
         */
        this.name = guild.name;

        /**
         * Whether or not the guild's not listed publicly (due to inactive invite)
         * @type {Boolean}
         */
        this.isPublic = guild.public;

        /**
         * Whether or not the guild is Premium.
         * @type {Boolean}
         */
        this.isPremium = guild.premium;

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
     * An array of emoji IDs the guild has.
     * @type {Array<String>}
     */
    get emojis() {
        return this.guild.emojis;
    }

    /**
     * Returns the guild's page URL.
     * @type {String}
     */
    get url() {
        return `https://botlist.space/server/${this.id}`;
    }

    /**
     * Returns the guild's vanity in the form of a URL, if the guild has a vanity.
     * @type {String|null}
     */
    get vanityURL() {
        if (!this.vanity) return null;
        return `https://botlist.space/server/${this.vanity}`;
    }

    /**
     * Get the guild's owners.
     * @param {FetchOptions} [options={}] Fetch options.
     * @returns {Array<User.User>} An array of the guild's owners.
     * @example
     * Guild.owners({ specified: 'username' })
     *  .then(owners => console.log(`The guild owners' usernames are: ${owners}`))
     *  .catch(console.log);
     */
    owners(options = {}) {
        if (options !== Object(options) || options instanceof Array) throw new TypeError('options must be an object.');
        const Options = new FetchOptions(options);

        if (Options.normal) {
            return Options.specified ? this.guild.owners.map(owner => owner[Options.specified]) : this.guild.owners;
        } else {
            const Owners = this.guild.owners.map(owner => new User.User(owner));
            return Options.specified ? Owners.map(owner => owner[Options.specified]) : Owners;
        }
    }

    /**
     * Returns a string containing the guild name.
     * @returns {String} The guild name.
     */
    toString() {
        return this.name;
    }
}

exports.Guild = Guild;
const Base = require('./Base.js').Base;
const FetchOptions = require('./FetchOptions.js').FetchOptions;
const PartialUser = require('./PartialUser.js').PartialUser;

/**
 * Represents any guild that has been submitted onto botlist.space.
 * @class
 * @extends {Base}
 */
class Guild extends Base {
    /**
     * @param {object} guild The plain guild object, fetched from the API.
     */
    constructor(guild) {
        super(guild);
        Object.defineProperty(this, 'guild', { writable: true, enumerable: false });

        /**
         * The plain guild object.
         * @type {object}
         */
        this.guild = guild;

        /**
         * Whether or not the guild is in compliance with listing its emojis.
         * @type {boolean}
         */
        this.compliance = guild.compliance;

        /**
         * The guild's full description, if any.
         * @type {?string}
         */
        this.fullDescription = guild.full_description;

        /**
         * The guild's icon URL.
         * @type {string}
         */
        this.icon = guild.icon;

        /**
         * Whether or not the guild's icon is marked as child friendly.
         * @type {boolean}
         */
        this.isChildFriendly = guild.iconChildFriendly;

        /**
         * Whether or not the guild is featured on the front page.
         * @type {boolean}
         */
        this.isFeatured = guild.featured;

        /**
         * Whether or not the guild is Premium.
         * @type {boolean}
         */
        this.isPremium = guild.premium;

        /**
         * Whether or not the guild's not listed publicly (due to inactive invite)
         * @type {boolean}
         */
        this.isPublic = guild.public;

        /**
         * The number of members there currently are in the Guild
         * @type {number}
         */
        this.memberCount = guild.member_count;

        /**
         * The guild's name.
         * @type {string}
         */
        this.name = guild.name;

        /**
         * The guild's short description.
         * @type {string}
         */
        this.shortDescription = guild.short_description;

        /**
         * The guild's timestamp, in which the guild had been submitted.
         * @type {number}
         */
        this.timestamp = new Date(guild.timestamp).getTime();

        /**
         * The guild's vanity, if any.
         * @type {?string}
         */
        this.vanity = guild.vanity;
    }

    /**
     * Returns the guild's page URL.
     * @type {string}
     */
    get url() {
        return `https://botlist.space/server/${this.id}`;
    }

    /**
     * Returns the guild's vanity in the form of a URL, if the guild has a vanity.
     * @type {?string}
     */
    get vanityURL() {
        if (!this.vanity) return null;
        return `https://botlist.space/server/${this.vanity}`;
    }

    /**
     * Get the guild's owners.
     * @param {FetchOptions} [options={}] Fetch options.
     * @returns {PartialUser[]} An array of the guild's owners.
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
            const Owners = Options.stringify ? this.guild.owners.map(owner => new PartialUser(owner).toString()) : this.guild.owners.map(owner => new PartialUser(owner));
            const resolved = Options.specified ? Owners.map(owner => owner[Options.specified]) : Owners;
            return resolved;
        }
    }

    /**
     * Returns a string containing the guild name.
     * @returns {string} The guild name.
     * @example console.log(`Hey look a guild with a name ${guild}!`); // Hey look a guild with a name Hell's Door!
     */
    toString() {
        return this.name;
    }
}

exports.Guild = Guild;
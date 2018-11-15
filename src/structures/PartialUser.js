const Base = require('./Base.js').Base;

/**
 * A user with limited information.
 * @class
 */
class PartialUser extends Base {
    /**
     * @param {Object} base The partial user fetched from the API.
     */
    constructor(base) {
        super(base);

        Object.defineProperty(this, 'user', { writable: true, enumerable: false });

        /**
         * The plain user object itself.
         * @type {Object}
         */
        this.user = base;

        /**
         * The avatar of the user.
         * @type {String}
         */
        this.avatar = base.avatar;

        /**
         * The discriminator of the user.
         * @type {String}
         */
        this.discriminator = base.discriminator;

        /**
         * If any, the user's github username.
         * @type {?String}
         */
        this.githubUsername = base.links.github;

        /**
         * If any, the user's gitlab username.
         * @type {?String}
         */
        this.gitlabUsername = base.links.gitlab;

        /**
         * The short description of the user.
         * @type {String}
         */
        this.shortDescription = base.short_description;

        /**
         * The user's username.
         * @type {String}
         */
        this.username = base.username;
    }

    /**
     * The user's github URL.
     * @type {?String}
     */
    get githubURL() {
        if (!this.githubUsername) return null;
        return `https://github.com/${this.githubUsername}`;
    }

    /**
     * The user's gitlab URL.
     * @type {?String}
     */
    get gitlabURL() {
        if (!this.gitlabUsername) return null;
        return `https://gitlab.com/${this.gitlabUsername}`;
    }

    /**
     * The user's tag.
     * @type {String}
     */
    get tag() {
        return `${this.username}#${this.discriminator}`;
    }

    /**
     * Returns the user's page URL.
     * @type {String}
     */
    get url() {
        return `https://botlist.space/user/${this.id}`;
    }

    /**
     * Returns the user's mention, rather than the user object.
     * @returns {String} The user mention.
     * @example
     * console.log(`Hey look a random user ${user}`) // Hey look a random user <@235593018332282884>
     */
    toString() {
        return `<@${this.id}>`;
    }
}

exports.PartialUser = PartialUser;
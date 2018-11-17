const Base = require('./Base.js').Base;

/**
 * A user with limited information.
 * @class
 * @extends {Base}
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
         * @type {string}
         */
        this.avatar = base.avatar;

        /**
         * The discriminator of the user.
         * @type {string}
         */
        this.discriminator = base.discriminator;

        /**
         * If any, the user's github username.
         * @type {?string}
         */
        this.githubUsername = base.links.github;

        /**
         * If any, the user's gitlab username.
         * @type {?string}
         */
        this.gitlabUsername = base.links.gitlab;

        /**
         * The short description of the user.
         * @type {string}
         */
        this.shortDescription = base.short_description;

        /**
         * The user's username.
         * @type {string}
         */
        this.username = base.username;
    }

    /**
     * The user's github URL.
     * @type {?string}
     */
    get githubURL() {
        if (!this.githubUsername) return null;
        return `https://github.com/${this.githubUsername}`;
    }

    /**
     * The user's gitlab URL.
     * @type {?string}
     */
    get gitlabURL() {
        if (!this.gitlabUsername) return null;
        return `https://gitlab.com/${this.gitlabUsername}`;
    }

    /**
     * The user's tag.
     * @type {string}
     */
    get tag() {
        return `${this.username}#${this.discriminator}`;
    }

    /**
     * Returns the user's page URL.
     * @type {string}
     */
    get url() {
        return `https://botlist.space/user/${this.id}`;
    }

    /**
     * Returns the user's mention, rather than the user object.
     * @returns {string}
     * @example
     * console.log(`Hey look a random user ${user}`) // Hey look a random user <@235593018332282884>
     */
    toString() {
        return `<@${this.id}>`;
    }
}

exports.PartialUser = PartialUser;
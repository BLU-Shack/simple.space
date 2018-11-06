/**
 * Represents the statistics that have been fetched from the API.
 * @class
 */
class Stats {
    /**
     * @constructor
     * @param {Object} stats The plain stats object, fetched from the API.
     */
    constructor(stats) {
        Object.defineProperty(this, 'stats', { writable: true, enumerable: false });

        /**
         * The plain stats object itself.
         * @type {Object}
         */
        this.stats = stats;

        /**
         * All bot information.
         * @property {Number} total The total number of bots that have been submitted to the site.
         * @property {Number} approved The total number of approved bots.
         * @property {Number} unapproved The total number of unapproved bots.
         */
        this.bots = {
            total: stats.bots.total,
            approved: stats.bots.approved,
            unapproved: stats.bots.unapproved
        };

        this.emojis = stats.emojis;

        /**
         * The total number of guilds that had been submitted.
         * @type {Number}
         */
        this.guilds = stats.servers;

        /**
         * Whether or not it was successful at fetching statistics.
         * @type {Boolean}
         */
        this.successful = stats.success;

        /**
         * The total number of users that had logged in.
         * @type {Number}
         */
        this.users = stats.users;
    }

    /**
     * Fetch the total number of bots, servers, and users on the site.
     * @type {Number}
     */
    get total() {
        return this.bots.total + this.servers + this.users;
    }
}

exports.Stats = Stats;
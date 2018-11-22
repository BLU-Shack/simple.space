/**
 * Represents the statistics that have been fetched from the API.
 * @class
 */
class Stats {
    /**
     * @param {object} stats The plain stats object, fetched from the API.
     */
    constructor(stats) {
        Object.defineProperty(this, 'stats', { writable: true, enumerable: false });

        /**
         * The plain stats object itself.
         * @type {object}
         */
        this.stats = stats;

        /**
         * All bot information.
         * @type {object}
         * @property {number} total The total number of bots that have been submitted to the site.
         * @property {number} approved The total number of approved bots.
         * @property {number} unapproved The total number of unapproved bots.
         */
        this.bots = {
            total: stats.bots.total,
            approved: stats.bots.approved,
            unapproved: stats.bots.unapproved
        };

        /**
         * The total number of guilds that had been submitted.
         * @type {number}
         */
        this.guilds = stats.servers;

        /**
         * Whether or not it was successful at fetching statistics.
         * @type {boolean}
         */
        this.successful = stats.success;

        /**
         * The total number of users that had logged in.
         * @type {number}
         */
        this.users = stats.users;
    }

    /**
     * Fetch the total combined number of bots, servers, and users on the site.
     * @readonly
     * @type {number}
     */
    get combined() {
        return this.bots.total + this.servers + this.users;
    }
}

exports.Stats = Stats;
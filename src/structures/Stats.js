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
        /**
         * The plain stats object itself.
         * @type {Object}
         */
        this.stats = stats;

        /**
         * All bot information.
         * @returns {Object}
         * @property {Number} total The total number of bots that have been submitted to the site.
         * @property {Number} approved The total number of approved bots.
         * @property {Number} unapproved The total number of unapproved bots.
         */
        this.bots = {
            total: stats.bots.total,
            approved: stats.bots.approved,
            unapproved: stats.bots.unapproved
        };

        /**
         * The total number of servers that had been submitted.
         * @type {Number}
         */
        this.servers = stats.servers;

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
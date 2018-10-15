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
         * @type {Object}
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

        /**
         * The total number of bots.
         * @type {Number}
         */
        this.total = this.bots.total;

        /**
         * The total number of approved bots.
         * @type {Number}
         */
        this.totalApproved = this.bots.approved;

        /**
         * The total number of unapproved bots.
         * @type {Number}
         */
        this.totalUnapproved = this.bots.unapproved;
    }
}

exports.Stats = Stats;
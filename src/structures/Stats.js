const Base = require('./Base.js');

/**
 * botlist.space Statistics.
 * @extends {Base}
 */
class Stats extends Base {
	/**
	 * @param {object} obj
	 */
	constructor(obj) {
		super(obj);

		/**
		 * The Date of when the current Statistics were fetched.
		 * @type {Date}
		 */
		this.createdAt = new Date();

		/**
		 * The total amount of bots listed on botlist.space
		 * @type {number}
		 */
		this.totalBots = obj.total_bots;

		/**
		 * The total amount of approved bots listed on botlist.space
		 * @type {number}
		 */
		this.approvedBots = obj.approved_bots;

		/**
		 * The total amount of not yet approved bots on botlist.space
		 * @type {number}
		 */
		this.unapprovedBots = obj.unapproved_bots;

		/**
		 * The total number of users logged onto botlist.space
		 * @type {number}
		 */
		this.users = obj.users;

		/**
		 * The total number of tags available on botlist.space
		 * @type {number}
		 */
		this.tags = obj.tags;
	}

	/**
	 * The timestamp of when the current Statistics were fetched.
	 * @type {number}
	 */
	get createdTimestamp() {
		return this.createdAt.getTime();
	}

	/**
	 * The total number of bots and users on botlist.space
	 * @readonly
	 * @type {number}
	 */
	get botUserTotal() {
		return this.totalBots + this.users;
	}
}

module.exports = Stats;
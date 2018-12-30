const Base = require('./Base.js');

class Stats extends Base {
	constructor(obj) {
		super(obj);
		this.totalBots = obj.total_bots;
		this.approvedBots = obj.approved_bots;
		this.unapprovedBots = obj.unapproved_bots;
		this.users = obj.users;
	}

	get overall() {
		return this.totalBots + this.users;
	}
}

module.exports = Stats;
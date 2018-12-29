class Stats {
	constructor(obj) {
		Object.defineProperty(this, 'raw', { value: obj });
		this.totalBots = obj.total_bots;
		this.approvedBots = obj.approved_bots;
		this.unapprovedBots = obj.unapproved_bots;
		this.users = obj.users;
	}

	get combinedTotal() {
		return this.totalBots + this.users;
	}
}

module.exports = Stats;
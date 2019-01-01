const { Base } = require('.');

/**
 * Represents any guild that has been submitted onto botlist.space.
 * @extends {Base}
 */
class Guild extends Base {
	constructor(guild) {
		super(guild);
		throw new Error('There is not currently any "guild" object to test against for Guild.');
	}
}

module.exports = Guild;
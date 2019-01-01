const Classes = require('./structures/');
const Client = require('./Client.js');

module.exports = Object.assign(Classes, {
	Client,
	version: require('../package.json').version,
});
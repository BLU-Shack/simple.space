const Classes = require('./structures/');
const Client = require('./Client.js');

module.exports = Object.assign(Classes, {
	Client,
	get version() { return require('../package.json').version; },
});
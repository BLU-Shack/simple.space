/* eslint-disable */
const Space = require('../src/');
const { promisify } = require('util');
const Client = new Space.Client({ botToken: 'BOT_TOKEN', botID: '513219942418481162', autoCache: false, cache: true });
const timeout = async (ms) => {
	await promisify(setTimeout)(ms);
}

const bot = '228537642583588864';

console.log('For this TEST DEMO, we will have the following:\n', Client.options);

(async () => {
	await timeout(1000);
	console.log('Edit the property. cache -> false, Client.edit({ cache: false }).\n');
	await timeout(1000);
	Client.edit({ cache: false });
	console.log('New options:\n', Client.options);
	await timeout(1000);
	console.log(
		'Now fetching Bot 513219942418481162, Client.fetchBot() (Why is there no ID? If there is botID in the ClientOptions,' +
		'it automatically registers the ID as the ID to use for fetching the desired Bot. Makes for reducing functions like Self)'
	);
	console.log(await Client.fetchBot(bot));
	await timeout(2000);
	console.log('Specifically get the RAW object of the Bot, Client.fetchBot({ raw: true })');
	console.log(await Client.fetchBot({ raw: true }));
	console.log('This can be particularily useful when there is an API change/something new that is not yet available through the class object yet.');
	await timeout(2000);
	console.log('Now fetch a user with their ID 235593018332282884, Client.fetchUser(\'235593018332282884\')');
	console.log('Can also be Raw Fetched if desired');
	await timeout(1500)
	console.log('Now fetch botlist.space Statistics; Client.fetchStats()');
	console.log(await Client.fetchStats({ raw: false }));
})();
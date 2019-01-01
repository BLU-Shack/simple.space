/* eslint-disable */
const Space = require('../src/');
const { promisify } = require('util');
const Client = new Space.Client({ userToken: 'USER_TOKEN', botToken: 'BOT_TOKEN', botID: '372022813839851520', autoCache: false, cache: true });
const timeout = async (ms) => {
	await promisify(setTimeout)(ms);
}

const bot = '228537642583588864';

console.log('For this TEST DEMO, we will have the following:\n', Client.options);

(async () => {
	await timeout(500);
	console.log('Edit the property. cache -> false, Client.edit({ cache: false }).\n');
	await timeout(1000);
	Client.edit({ cache: false });
	console.log('New options:\n', Client.options);
	await timeout(500);
	console.log('Now fetching Bot 228537642583588864, Client.fetchBot(\'228537642583588864\')'); // Just a lie here...
	console.log(await Client.fetchBot(bot));
	await timeout(1000);
	console.log('Specifically get the RAW object of the Bot, Client.fetchBot({ raw: true })');
	console.log(await Client.fetchBot({ raw: true }));
	console.log('This can be particularily useful when there is an API change/something new that is not yet available through the class object yet.');
	await timeout(1000);
	console.log('Now fetch a user with their ID 235593018332282884 (that\'s me!), Client.fetchUser(\'235593018332282884\')');
	console.log(await Client.fetchUser('235593018332282884'));
	console.log('This can also be raw-fetched, but that\'d be too much. Also, that\'s the end of the demo, anyway!');
})();
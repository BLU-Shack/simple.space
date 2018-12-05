module.exports = {
	get ClientOptions() { return require('./ClientOptions.js').ClientOptions; },
	get FetchOptions() { return require('./FetchOptions.js').FetchOptions; },
	get PostOptions() { return require('./PostOptions.js').PostOptions; },
	get UpvoteFetchOptions() { return require('./UpvoteFetchOptions.js').UpvoteFetchOptions; },
	get WebhookOptions() { return require('./WebhookOptions.js'); }
};
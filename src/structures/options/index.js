module.exports = {
	get ClientOptions() { return require('./ClientOptions.js'); },
	get FetchOptions() { return require('./FetchOptions.js'); },
	get PostOptions() { return require('./PostOptions.js'); },
	get UpvoteFetchOptions() { return require('./UpvoteFetchOptions.js').UpvoteFetchOptions; }
};
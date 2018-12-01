/**
 * @typedef {string} ClientEvent
 * All events that the main Client uses.
 */
exports.ClientEvents = {
	post: 'post',
	ready: 'ready',
	cacheUpdateAll: 'cacheUpdateAll',
	cacheUpdateBots: 'cacheUpdateBots',
	cacheUpdateEmojis: 'cacheUpdateEmojis',
	cacheUpdateGuilds: 'cacheUpdateGuilds',
};

/**
 * @typedef {string} WebhookEvent
 * All events that the Webhook uses.
 */
exports.WebhookEvents = {
	upvote: 'upvote',
	error: 'error'
};
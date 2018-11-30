/**
 * @typedef {object} WebhookOptions
 * @property {number} [port=1234] The port number to listen for.
 * @property {string} [path='/'] The path to watch for.
 * @property {string} [token=null] The authentication token (which is the Bot Token) to Verify an upvote.
 */
module.exports = {
	port: 1234,
	path: '/',
	token: null
};
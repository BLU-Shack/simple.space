const DefaultOptions = require('./structures/options/WebhookOptions.js');
const EventEmitter = require('events');
const express = require('express');
const app = express();
const { WebhookInfo } = require('./structures/Classes.js').Classes; // eslint-disable-line no-unused-vars
const { isObject, check, stream, webhookEvents: Events } = require('./util/');

/**
 * The main class for the webhook.
 * @class
 * @extends {EventEmitter}
 */
class Webhook extends EventEmitter {
	/**
	 * @param {WebhookOptions} [options={}] The Webhook Options.
	 */
	constructor(options = {}) {
		super();

		/**
		 * The express application used for the Webhook.
		 * @private
		 * @type {Express}
		 */
		this.app = app;

		/**
		 * All previously used ports.
		 * @private
		 * @type {number[]}
		 */
		this.ports = [];

		/**
		 * The Webhook Options.
		 * @type {WebhookOptions}
		 */
		this.options = this.edit(options, true);

		/**
		 * Whether or not the Webhook is active.
		 * @type {boolean}
		 */
		this.active = true;
	}

	/**
	 * An array of all the webhook's events.
	 * @readonly
	 * @type {WebhookEvent[]}
	 */
	get events() {
		return Object.getOwnPropertyNames(Events);
	}

	/**
	 * The handler used for watching stuff.
	 * Mimicked from [Discord Bot List's handler](https://github.com/xDimGG/dbl-api/blob/master/src/Client.js#L181).
	 * @readonly
	 * @type {Function}
	 */
	get handler() {
		return async (req, res) => {
			const close = (code, message) => {
				res.sendStatus(code);
				this.emit(Events.error, message);
			};

			if (!this.active) return close(412, 'Deactivated');
			else if (req.method !== 'POST') return close(405, 'Only POST Method is supported');
			else if (req.headers['content-type'] !== 'application/json') return close(415, 'Media Type must be application/json');
			else if (req.headers['user-agent'] !== 'botlist.space Webhooks (https://botlist.space)') return close(403, 'Invalid User Agent');
			else if (this.options.token && req.headers['authorization'] !== this.options.token) return close(403, 'Forbidden');

			try {
				const contents = JSON.parse(await stream(req));
				this.emit(Events.upvote, new WebhookInfo(contents), req.headers);
				res.status(200).send('OK');
			} catch (error) {
				this.emit(Events.error, error);
			}
		};
	}

	/**
	 * Edits the Webhook Options.
	 * @param {WebhookOptions} [options={}]
	 * @param {boolean} [preset=false]
	 * @returns {WebhookOptions}
	 */
	edit(options = {}, preset = false) {
		if (!isObject(options)) throw new TypeError('options must be an object.');
		this.options = check.webhookEdit(Object.assign(preset ? DefaultOptions : this.options, options));

		this.handle();
		return this.options;
	}

	/**
	 * Starts handling the webhook.
	 * Does not run if the new port is the same as the old port.
	 * @returns {boolean}
	 */
	handle() {
		if (this.ports.some(port => this.options.port === port)) return;
		this.app.post(this.options.path, this.handler).listen(this.options.port);
		this.ports.push(this.options.port);
		return true;
	}

	/**
	 * Deactivates the webhook.
	 * @returns {Webhook}
	 */
	close() {
		this.active = false;
		return this;
	}

	/**
	 * Reactivates the webhook.
	 * @returns {Webhook}
	 */
	open() {
		this.active = true;
		return this;
	}
}

module.exports = Webhook;

/**
 * @typedef {object} UpvoteInfo The
 * @property {string} [bot] The bot ID. Will instead be the guild ID if upvote comes from a guild.
 * @property {string} [guild] The guild ID. Will instead be the bot ID if upvote comes from a bot.
 * @property {number} timestamp The timestamp in which the upvote was registered.
 * @property {WebhookUser} user The user who upvoted the bot/guild.
 */

/**
 * Emitted when a user upvotes the bot/guild.
 * @event Webhook#upvote
 * @param {UpvoteInfo} contents The contents.
 * @param {object} headers The headers.
 */

/**
 * Emitted when an error occurs.
 * @event Webhook#error
 * @param {string} message The error message.
 */
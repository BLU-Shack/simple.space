const WebhookOptions = require('./structures/options/WebhookOptions.js');
const EventEmitter = require('events');
const express = require('express');
const app = express();
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
	 * @type {WebhookEvent[]}
	 */
	get events() {
		return Object.getOwnPropertyNames(Events);
	}

	/**
	 * The handler used for watching stuff.
	 * Mimicked from [Discord Bot List's handler](https://github.com/xDimGG/dbl-api/blob/master/src/Client.js#L181).
	 * @type {Function}
	 */
	get handler() {
		return async (req, res) => {
			const close = (code, message) => {
				res.sendStatus(code);
				this.emit(Events.error, message);
			};

			if (!this.active) return close(412);
			else if (req.method !== 'POST') return close(405, 'Only POST Method is supported');
			else if (req.headers['content-type'] !== 'application/json') return close(415, 'Media Type must be application/json');
			else if (req.headers['user-agent'] !== 'botlist.space Webhooks (https://botlist.space)') return close(403, 'Invalid User Agent');
			else if (this.options.token && req.headers['authorization'] !== this.options.token) return close(403, 'Forbidden');

			try {
				const contents = JSON.parse(await stream(req));
				this.emit(Events.upvote, contents, req.headers);
				res.status(200).send('OK');
			} catch (error) {
				this.emit(Events.error, error);
			}
		};
	}

	/**
	 * Edits the Webhook Options.
	 * @param {WebhookOptions} [options=WebhookOptions]
	 * @param {boolean} [preset=false]
	 * @returns {WebhookOptions}
	 */
	edit(options = WebhookOptions, preset = false) {
		if (!isObject(options)) throw new TypeError('options must be an object.');
		const Options = check.webhookEdit(options);
		this.options = Object.assign(preset ? WebhookOptions : this.options, Options);

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
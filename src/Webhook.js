const WebhookOptions = require('./structures/options/WebhookOptions.js');
const EventEmitter = require('events');
const express = require('express')();
const { isObject, check, events, stream } = require('./util/');

/**
 * Creates a watchable webhook.
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
		 * The Webhook Options.
		 * @type {WebhookOptions}
		 */
		this.options = this.edit(options, true);

		/**
		 * Whether or not the Webhook is actively listening.
		 * @type {boolean}
		 */
		this.active = true;

		/**
		 * The express application used for the Webhook.
		 * @type {express}
		 */
		this.app = express;

		this.handle();
	}

	/**
	 * Mimicked from [Discord Bot List's handler](https://github.com/xDimGG/dbl-api/blob/master/src/Client.js#L181).
	 */
	get handler() {
		/**
		 * @param {express} req
		 */
		return () => {
			//
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
		return this.options;
	}

	/**
	 * Mimicked from Discord Bot List's webhook method.
	 */
	handle() {
		this.app.listen(this.options.port);

		this.app.post(this.options.path, async (req, res) => {
			const close = (code) => {
				res.writeHead(code);
				res.end();
			};
			this.emit(events.debug, req.headers);

			if (req.method !== 'POST') return close(405);
			else if (req.headers['content-type'] !== 'application/json') return close(415);
			else if (this.options.token && req.headers['authorization'] !== this.options.token) return close(403);

			try {
				const contents = JSON.parse(await stream(req));
				this.emit('pootis', contents);
			} catch (error) {
				//
			}
		});
	}
}

module.exports = Webhook;
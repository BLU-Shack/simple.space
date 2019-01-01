/**
 * @external Headers
 * @see {@link https://github.com/bitinn/node-fetch/blob/master/src/headers.js}
 */

class Ratelimit extends Error {
	/**
	 * @param {Headers} headers
	 * @param {string} endpoint
	 */
	constructor(headers, endpoint) {
		super();
		Error.captureStackTrace(this, Ratelimit);

		// It has to be in here, otherwise the error output emits an object >:(
		Object.defineProperties(this, {
			name: {
				value: 'Ratelimit',
			},
			headers: {
				value: headers,
			},
			message: {
				value: `Endpoint /v${endpoint} Ratelimited, ${this.limit} times per ${this.retryAfter} second${this.retryAfter === 1 ? '' : 's'}`,
			}
		});
	}

	get limit() {
		return parseInt(this.headers.get('x-ratelimit-limit'));
	}

	get retryAfter() {
		return parseInt(this.headers.get('retry-after'));
	}

	toString() {
		return this.messages.split(' ')[1];
	}
}

module.exports = Ratelimit;
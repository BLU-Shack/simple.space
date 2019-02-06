/**
 * @external Headers
 * @see {@link https://github.com/bitinn/node-fetch/blob/master/src/headers.js}
 */

/**
 * Thrown when there is a Ratelimit. Includes more information about the kind of ratelimit.
 * @extends {Error}
 */
class Ratelimit extends Error {
	/**
	 * @param {Headers} headers
	 * @param {string} endpoint
	 */
	constructor(headers, endpoint) {
		super();
		Error.captureStackTrace(this, Ratelimit);

		// It has to be like this, otherwise the error output emits an object >:( (Enumerability)
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

/**
 * FetchError
 * @extends {Error}
 */
class FetchError extends Error {
	/**
     * @param {Response} i
	 * @param {string} message
     */
	constructor(i, message) {
		super(`${i.status} ${message}`);
		Object.defineProperty(this, 'name', { value: 'FetchError' });
		if (Error.captureStackTrace) Error.captureStackTrace(this, FetchError);
	}

	toString() {
		return this.message;
	}
}

exports.FetchError = FetchError;
exports.Ratelimit = Ratelimit;
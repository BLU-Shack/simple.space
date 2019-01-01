class Ratelimit extends Error {
	/**
	 * @param {Headers} headers
	 */
	constructor(headers) {
		super();
		Error.captureStackTrace(this, Ratelimit);

		Object.defineProperties(this, {
			name: { value: 'Ratelimit' },
		});

		this.message = `${this.limit} time${this.limit === 1 ? '' : 's'} every ${this.retryAfter} second${this.retryAfter === '1' ? '' : 's'}`;
		this.headers = headers;
	}

	get limit() {
		return parseInt(this.headers.get('x-ratelimit-limit'));
	}

	get retryAfter() {
		return parseInt(this.headers.get('retry-after'));
	}

	toString() {
		return this.message;
	}
}

module.exports = Ratelimit;
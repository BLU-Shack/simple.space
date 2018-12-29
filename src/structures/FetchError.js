/**
 * FetchError
 * @class
 * @extends {Error}
 */
class FetchError extends Error {
	/**
     * @param {object} error The error body.
     * @param {string} name The item not found.
     */
	constructor(message, code) {
		super(message);
		Object.defineProperty(this, 'name', { value: 'FetchError' });
		this.message = `${code} ${message}`;
		if (Error.captureStackTrace) Error.captureStackTrace(this, FetchError);
	}

	toString() {
		return this.message;
	}
}

module.exports = FetchError;
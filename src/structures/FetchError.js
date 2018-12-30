/**
 * FetchError
 * @extends {Error}
 */
class FetchError extends Error {
	/**
     * @param {string} message The message.
	 * @param {string} code The code.
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
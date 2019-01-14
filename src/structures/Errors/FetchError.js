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

module.exports = FetchError;
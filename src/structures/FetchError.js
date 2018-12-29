/**
 * FetchError
 * @class
 * @extends {Error}
 */
class FetchError extends Error {
	/**
     * @param {string} message The message.
	 * @param {string} code The code.
     * @param {string} [name='?'] The item not found.
     */
	constructor(message, code, name = '?') {
		super(message);
		Object.defineProperty(this, 'name', { value: 'FetchError' });
		this.message = `${code} ${code !== 404 ? message : name + ' Not Found'}`;
		if (Error.captureStackTrace) Error.captureStackTrace(this, FetchError);
	}

	toString() {
		return this.message;
	}
}

module.exports = FetchError;
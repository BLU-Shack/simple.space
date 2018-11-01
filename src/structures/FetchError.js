/**
 * FetchError
 * @class
 * @extends {Error}
 */
class FetchError extends Error {
    /**
     * @param {Object} error The error body.
     * @param {String} name The item not found.
     * @constructor
     */
    constructor(error, name) {
        super(error);
        this.name = 'FetchError';
        this.message = `${error.code} ${error.code === 404 ? `${name || '?'} Not Found` : error.message}`;

        Error.captureStackTrace(this, FetchError);
    }
}

exports.FetchError = FetchError;
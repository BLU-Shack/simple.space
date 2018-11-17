/**
 * FetchError
 * @class
 * @extends {Error}
 */
class FetchError extends Error {
    /**
     * @param {Object} error The error body.
     * @param {String} name The item not found.
     */
    constructor(error, name) {
        super(error);
        this.message = `${error.code} ${error.code === 404 ? `${name || '?'} Not Found` : error.message}`;
        this.name = 'FetchError';

        if (Error.captureStackTrace) Error.captureStackTrace(this, FetchError);
    }

    toString() {
        return this.message;
    }
}

exports.FetchError = FetchError;
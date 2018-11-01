/**
 * The fetch options when fetching for a Bot/Guild/User on the site.
 * @class
 */
class FetchOptions {
    /**
     * @constructor
     * @param {FetchOptions} [options={}] The selected object.
     */
    constructor(options = {}) {
        /**
         * Whether or not to only get a specific value from the object.
         * @type {String|false}
         */
        this.specified = options.specified ? options.specified : false;
        if (typeof this.specified !== 'string' && typeof this.specified !== 'boolean') throw new TypeError('options.specified must be a string.');

        /**
         * Whether or not to only return the plain object.
         * @type {Boolean}
         */
        this.normal = options.normal || false;
        if (typeof this.normal !== 'boolean') throw new TypeError('options.normal must be boolean.');
    }
}

exports.FetchOptions = FetchOptions;
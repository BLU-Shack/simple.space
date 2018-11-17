/**
 * The fetch options when fetching for a Bot/Guild/User on the site.
 * @class
 */
class FetchOptions {
    /**
     * @param {FetchOptions} [options={}] The selected object.
     */
    constructor(options = {}) {
        /**
         * Whether or not to only get a specific value from the object.
         * @type {string|boolean}
         */
        this.specified = options.specified || false;
        if (typeof this.specified !== 'string' && typeof this.specified !== 'boolean') throw new TypeError('options.specified must be a string.');

        /**
         * Whether or not to only return the plain object.
         * @type {boolean}
         */
        this.normal = options.normal || false;
        if (typeof this.normal !== 'boolean') throw new TypeError('options.normal must be boolean.');

        /**
         * Whether or not to return the stringified form of the object. This will override the specified and normal parameters to false.
         * @type {boolean}
         */
        this.stringify = options.stringify || false;
        if (typeof this.stringify !== 'boolean') throw new TypeError('options.stringify must be boolean.');
        if (this.stringify) {
            this.specified = false;
            this.normal = false;
        }
    }
}

exports.FetchOptions = FetchOptions;
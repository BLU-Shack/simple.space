/**
 * The fetch options when fetching for a Bot/Guild/User on the site.
 * @class
 */
class FetchOptions {
    /**
     * @constructor
     * @param {FetchOptions} opts The selected object.
     */
    constructor(opts) {
        /**
         * Whether or not to only get a specific value from the object.
         * @type {String|false}
         */
        this.specified = opts.specified ? opts.specified : false;
        if (typeof this.specified !== 'string' && typeof this.specified !== 'boolean') throw new TypeError('options.specified must be a string.');

        /**
         * Whether or not to only return the plain object.
         * @type {Boolean}
         */
        this.normal = opts.normal || false;
        if (typeof this.normal !== 'boolean') throw new TypeError('options.normal must be boolean.');
    }
}

exports.FetchOptions = FetchOptions;
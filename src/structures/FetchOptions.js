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
        /**
         * Whether or not to only return the plain object.
         * @type {Boolean}
         */
        this.normal = opts.normal;
    }
}

exports.FetchOptions = FetchOptions;
/**
 * Fetch options when fetching for a User/Bot/Guild.
 * @typedef {Object} FetchOptions
 * @property {String} [specified=false] The specific value when fetching something.
 * @property {Boolean} [normal=false] Whether or not to only return the plain object, and not the custom class.
 */
class FetchOptions {
    constructor(opts) {
        this.specified = opts.specified ? opts.specified : false;
        this.normal = opts.normal ? opts.normal : false;
    }
}

module.exports = FetchOptions;
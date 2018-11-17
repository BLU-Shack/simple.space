const ClientOptions = require('./ClientOptions.js').ClientOptions;

/**
 * The fetch options when fetching for a Bot/Guild/User on the site.
 * @class
 */
class FetchOptions {
    /**
     * @param {Object} [options={}] The selected object.
     * @param {ClientOptions} [preset=ClientOptions.default] Preset Client Options.
     */
    constructor(options = {}, preset = ClientOptions.default) {
        /**
         * Whether or not to log the output. Overrides this.options.log
         * @type {Boolean}
         */
        this.log = typeof options.log !== 'undefined' ? options.log : (preset.log || false);
        if (typeof this.log !== 'boolean') throw new TypeError('options.log must be a boolean.');

        /**
         * Whether or not to only get a specific value from the object.
         * @type {String|Boolean}
         */
        this.specified = options.specified || false;
        if (typeof this.specified !== 'string' && typeof this.specified !== 'boolean') throw new TypeError('options.specified must be a string.');

        /**
         * Whether or not to only return the plain object.
         * @type {Boolean}
         */
        this.normal = options.normal || false;
        if (typeof this.normal !== 'boolean') throw new TypeError('options.normal must be boolean.');

        /**
         * Whether or not to return the stringified form of the object. This will override the specified and normal parameters to false.
         * @type {Boolean}
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
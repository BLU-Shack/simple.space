const ClientOptions = require('./ClientOptions.js').ClientOptions;

/**
 * The fetch options when fetching for a Bot/Guild/User on the site.
 * @class
 */
class FetchOptions {
    /**
     * @param {object} [options={}] The selected object.
     * @param {ClientOptions} [preset=ClientOptions.default] Preset Client Options.
     */
    constructor(options = {}, preset = ClientOptions.default) {
        /**
         * Whether or not to log the output. Overrides this.options.log
         * @type {boolean}
         */
        this.log = typeof options.log !== 'undefined' ? options.log : (preset.log || false);
        if (typeof this.log !== 'boolean') throw new TypeError('options.log must be a boolean.');

        /**
         * Whether or not to only get a specific value from the object.
         * @type {?string}
         */
        this.specified = options.specified || null;
        if (this.specified !== null && typeof this.specified !== 'string') throw new TypeError('options.specified must be a string.');

        /**
         * Whether or not to only return the plain object.
         * @type {?boolean}
         */
        this.normal = options.normal || false;
        if (typeof this.normal !== 'boolean') throw new TypeError('options.normal must be boolean.');

        /**
         * Whether or not to return the stringified form of the object. This will override the specified and normal parameters.
         * @type {?boolean}
         */
        this.stringify = options.stringify || false;
        if (typeof this.stringify !== 'boolean') throw new TypeError('options.stringify must be boolean.');
        if (this.stringify) {
            this.specified = null;
            this.normal = false;
        }
    }
}

exports.FetchOptions = FetchOptions;
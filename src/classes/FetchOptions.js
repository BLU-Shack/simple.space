class FetchOptions {
    constructor(opts) {
        /**
         * @type {String}
         */
        const specified = opts.specified ? opts.specified : false;
        this.specified = specified;
        /**
         * @type {Boolean}
         */
        const normal = opts.normal ? opts.normal : false;
        this.normal = normal;
    }
}

module.exports = FetchOptions;
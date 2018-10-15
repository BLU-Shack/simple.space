/**
 * The universal base for Bot/Guild/User classes.
 * @class
 */
class Base {
    /**
     * @param {Object} base The Bot/Guild/User object fetched from the API.
     */
    constructor(base) {
        /**
         * The ID of the base object.
         * @type {String}
         */
        this.id = base.id;
    }
}

exports.Base = Base;
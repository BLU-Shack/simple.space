/**
 * The universal base for Bot/Emoji/Guild/User classes.
 * @class
 */
class Base {
    /**
     * @param {Object} base A Bot/Emoji/Guild/User object fetched from the API.
     */
    constructor(base) {
        /**
         * The Base's ID.
         * @type {string}
         */
        this.id = base.id;
    }
}

exports.Base = Base;
/**
 * The universal base for Bot/Guild/User classes.
 */
class Base {
    /**
     * @param {Object} base The Bot/Guild/User object fetched from the API.
     */
    constructor(base) {
        this.id = base.id;
    }
}

module.exports = Base;
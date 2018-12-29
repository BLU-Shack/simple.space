/**
 * The universal base for Bot/Emoji/Guild/User classes.
 * @class
 */
class Base {
	/**
     * @param {object} obj A Bot/Emoji/Guild/User object fetched from the API.
     */
	constructor(obj) {
		/**
         * The Base's ID.
         * @type {string}
         */
		this.id = obj.id;

		Object.defineProperty(this, 'raw', { value: obj });
	}
}

module.exports = Base;
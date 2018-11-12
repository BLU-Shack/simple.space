/**
 * A storage class that includes additional methods.
 * @class
 * @extends {Map}
 */
class Store extends Map {
    /**
     * @param {Iterable<any, any>} [iterable]
     */
    constructor(iterable) {
        super(iterable);
    }

    /**
     * Returns all the values of an array.
     * @returns {Array<*>}
     */
    array() {
        return [...this.values()];
    }

    /**
     * Filters the store using a passed function, and returns a new Store including the filtered values.
     * @param {Function} func The provided function to test against the Store.
     * @param {*} [bind] The value to bind to "this" value.
     * @returns {Store} The new Store containing the filtered contents.
     */
    filter(func, bind) {
        if (typeof func !== 'function') throw new TypeError('func must be a function.');
        if (typeof bind !== 'undefined') func = func.bind(bind);
        const filtered = new this.constructor[Symbol.species]();

        for (const [key, value] of this) {
            if (func(value, key)) filtered.set(key, value);
        }

        return filtered;
    }

    /**
     * Returns all the keys in an array.
     * @returns {Array<*>}
     */
    keyArray() {
        return [...this.keys()];
    }
}

exports.Store = Store;
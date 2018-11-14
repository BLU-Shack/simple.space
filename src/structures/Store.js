/**
 * A storage class that includes additional methods.
 * @class
 * @extends {Map}
 * @template K
 * @template V
 */
class Store extends Map {
    /**
     * @param {Iterable<[any, any]>} [iterable]
     */
    constructor(iterable) {
        super(iterable);
    }

    /**
     * Returns all the values of the Store in an array.
     * @returns {Array<*>}
     */
    array() {
        return [...this.values()];
    }

    /**
     * Filters the store using a passed function, and returns a new Store including the filtered values.
     * @param {Function} func The provided function to test against the Store.
     * @param {*} [bind] The value to bind to "this" value.
     * @returns {Store<*, *>} The new Store containing the filtered contents.
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
     * Returns all the keys of the Store in an array.
     * @returns {Array<*>}
     */
    keyArray() {
        return [...this.keys()];
    }

    /**
     * Retrives a random value of the Store.
     * @returns {*}
     */
    random() {
        const values = this.array();
        return values[Math.floor(Math.random() * values.length)];
    }

    /**
     * Retrieves a random key of the Store.
     * @returns {*}
     */
    randomKey() {
        const keys = this.keyArray();
        return keys[Math.floor(Math.random() * keys.length)];
    }

    /**
     * Retrieves a random key-value pair of the Store and returns a new Store.
     * @returns {Array<*>}
     */
    randomPair() {
        const random = this.randomKey();
        const pair = [];

        pair.push(random, this.get(random));
        return pair;
    }
}

exports.Store = Store;
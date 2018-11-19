/**
 * A storage class that includes additional methods.
 * @class
 * @extends {Map}
 * @template K, V
 */
class Store extends Map {
    /**
     * @param {Iterable<[*, *]>} [iterable] An iterable object.
     */
    constructor(iterable) {
        super(iterable);
    }

    /**
     * @ignore
     * @param {K} key The key to use when fetching for a value.
     * @returns {V} The value retrieved.
     */
    get(key) {
        return super.get(key);
    }

    /**
     * Returns all the values of the Store in an array.
     * @returns {V[]} The array of the Store's values.
     */
    array() {
        return [...this.values()];
    }

    /**
     * Filters the store using a passed function, and returns a new Store including the filtered values.
     * @param {(v: V, k: K) => boolean} func The provided function to test against the Store.
     * @param {*} [bind] The value to bind to "this" value.
     * @returns {Store<K, V>} The new Store containing the filtered contents.
     * @example
     * Client.fetchAllBots()
     *  .then(bots => {
     *   const onlyApproved = bots.filter(bot => bot.isApproved);
     *   console.log(`${onlyApproved.size} bots are approved.`);
     *  })
     * .catch(console.error);
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
     * @returns {K[]} An array of the Store's keys.
     */
    keyArray() {
        return [...this.keys()];
    }

    /**
     * Maps each and every value in the Store, and returns an array containing the new values.
     * @param {(v: V, k: K) => T} func The function to run for each value and key in the Store.
     * @param {*} [bind] The variable to bind ``this`` to the function.
     * @returns {T[]} The mapped values.
     * @template T
     */
    map(func, bind) {
        if (typeof func !== 'function') throw new TypeError('func must be a function.');
        if (typeof bind !== 'undefined') func = func.bind(bind);

        const mapped = [];
        for (const [key, value] of this) mapped.push(func(value, key));
        return mapped;
    }

    /**
     * Retrives a random value of the Store.
     * @returns {V} A random value.
     */
    random() {
        const values = this.array();
        return values[Math.floor(Math.random() * values.length)];
    }

    /**
     * Retrieves a random key of the Store.
     * @returns {K} A random key.
     */
    randomKey() {
        const keys = this.keyArray();
        return keys[Math.floor(Math.random() * keys.length)];
    }

    /**
     * Retrieves a random key-value pair of the Store and returns a new Array
     * @returns {(K | V)[]} A random pair.
     */
    randomPair() {
        const key = this.randomKey();
        const pair = [];

        pair.push(key, this.get(key));
        return pair;
    }
}

exports.Store = Store;
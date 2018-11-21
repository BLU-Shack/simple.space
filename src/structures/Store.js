/**
 * A storage class that includes additional methods.
 * @class
 * @extends {Map<K, V>}
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
     *
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
     *
     * @template T
     * @param {(v: V, k: K) => T} func The function to run for each value and key in the Store.
     * @param {*} [bind] The variable to bind ``this`` to the function.
     * @returns {T[]} The mapped values.
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

    /**
     * Splits the Store into two stores based on a function that
     * testifies each pair in the Store, those that pass to the
     * first Store and those that fail in the second Store.
     * @param {(v: V, k: K) => boolean} func The function passed to testify.
     * @param {*} [bind] The value to bind ``this`` to the function.
     * @returns {Store<K, V>[]}
     * @example
     * const [approvedBots, unapprovedBots] = Client.bots.slice(bot => bot.isApproved);
     * console.log(`The total of approved bots are ${approvedBots.size}, with ${unapprovedBots.size} being unapproved!`)
     */
    slice(func, bind) {
        if (typeof func !== 'function') throw new TypeError('func must be a Function.');
        if (typeof bind !== 'undefined') func = func.bind(bind);

        const [first, second] = [new this.constructor[Symbol.species](), new this.constructor[Symbol.species]()];
        for (const [key, value] of this) {
            if (func(value, key)) first.set(key, value);
            else second.set(key, value);
        }
        return [first, second];
    }
}

exports.Store = Store;
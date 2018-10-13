class SpaceOptions {
    /**
     * @param {ObjectConstructor} newObj Old Object.
     * @param {ObjectConstructor} oldObj New Object.
     */
    constructor(newObj, oldObj) {
        this.token = newObj.hasOwnProperty('token') ? newObj.token !== 'none' ? newObj.token : false : oldObj.token;

        this.client = newObj.hasOwnProperty('client') ? newObj.client !== 'none' ? newObj.client : false : oldObj.token;

        this.botID = newObj.hasOwnProperty('botID') ? newObj.botID !== 'none' ? newObj.botID : false : oldObj.botID;

        this.log = newObj.hasOwnProperty('log') ? newObj.log !== 'none' ? newObj.log : false : oldObj.log;
    }
}

module.exports = SpaceOptions;
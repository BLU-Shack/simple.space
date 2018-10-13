class ClassBase {
    constructor(Base) {
        /**
         * @type {String}
         */
        const id = Base.id;
        this.id = id;
    }
}

module.exports = ClassBase;
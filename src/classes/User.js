const Base = require('./Base');
/* eslint-disable */
const FetchOptions = require('./FetchOptions');
const Bot = require('./Bot');
const Guild = require('./Guild');
/* eslint-enable */

class User extends Base {
    constructor(user) {
        super(user);
        this.user = user;

        /** @type {String} */
        const avatar = user.avatar;
        this.avatar = avatar;

        /** @type {String} */
        const discriminator = user.discriminator;
        this.discriminator = discriminator;

        /** @type {String} */
        const username = user.username;
        this.username = username;

        /** @type {String} */
        const tag = `${this.username}#${discriminator}`;
        this.tag = tag;

        /** @type {String} */
        const github = user.links.github;
        /** @type {String} */
        const gitlab = user.links.gitlab;
        this.links = { github, gitlab };

        /** @type {String} */
        const description = user.short_description;
        this.description = description;
     }

     toString() {
         return `<@${this.id}>`;
     }
}

module.exports = User;
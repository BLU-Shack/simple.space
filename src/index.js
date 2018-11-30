const Classes = require('./structures/Classes.js').Classes;
const Client = require('./Client.js');
const Webhook = require('./Webhook.js');

module.exports = {
    // The Client and Version
    get Client() { return Client; },
    get Webhook() { return Webhook; },
    get version() { return require('../package.json').version; },

    // The Main Classes
    get Bot() { return Classes.Bot; },
    get Emoji() { return Classes.Emoji; },
    get Guild() { return Classes.Guild; },
    get User() { return Classes.User; },

    // The Extension Classes
    get PartialUser() { return Classes.PartialUser; },
    get UpvoteUser() { return Classes.UpvoteUser; },
    get Base() { return Classes.Base; },

    // The Options for Fetch/Post/Init
    get ClientOptions() { return Classes.ClientOptions; },
    get FetchOptions() { return Classes.FetchOptions; },
    get PostOptions() { return Classes.PostOptions; },
    get UpvoteFetchOptions() { return Classes.UpvoteFetchOptions; },

    // Misc Classes
    get FetchError() { return Classes.FetchError; },
    get Stats() { return Classes.Stats; },
    get Store() { return Classes.Store; }
};
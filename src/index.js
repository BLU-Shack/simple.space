const Classes = require('./structures/Classes.js').Classes;
const Client = require('./Client.js');

module.exports = {
    Client: Client,
    version: require('../package.json').version,

    Bot: Classes.Bot,
    Emoji: Classes.Emoji,
    Guild: Classes.Guild,
    User: Classes.User,

    PartialUser: Classes.PartialUser,
    UpvoteUser: Classes.UpvoteUser,
    Base: Classes.Base,

    ClientOptions: Classes.ClientOptions,
    FetchOptions: Classes.FetchOptions,
    PostOptions: Classes.PostOptions,
    UpvoteFetchOptions: Classes.UpvoteFetchOptions,

    FetchError: Classes.FetchError,
    Stats: Classes.Stats,
    Store: Classes.Store
};
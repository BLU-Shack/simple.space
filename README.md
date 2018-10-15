# botlist.space - Alternate Package

[DOCUMENTATION](https://iredme.github.io/simple.space/)

[![NPM](https://nodei.co/npm/simple.space.png)](https://nodei.co/npm/simple.space/)

A simplified alternative package to [the official](https://www.npmjs.com/package/botlist.space). :)

To install, use ``npm i simple.space``; But you already know that, right?

## What sets the difference than the original?

* Servers are named "Guilds"
* Functions are typically easier to remember.

## Examples

Wait, before we get in, let me explain things.

* The ``value = example`` part is the default value if not supplied. If there is none, either it's required, or it doesn't supply a default value since it's not needed.
* The function formats are as follows:
```js
// Small description of what thing does
// For each value: valueExample (TypeOfValue) => Description of how value affects function.
// EXAMPLE: token (String) => This value requires a String-type value to be passed in.
// Sometimes, there is a ? before the Type, which means Optional.
```

```js
// First, you have to initialize the package. Obviously.
const SimpleSpace = require('simple.space');

// options (?SpaceOptions) => The options for initiation.
// options.token (?String) => The API token, required for some actions.
// options.botID (?String) => The bot ID for self functions.
// options.client (?discordjs.Client) => The client for initialization. Used for shortcut of setGuilds() without needing to supply a value.
// options.log (?Boolean) => Whether or not to log FETCH actions.
const Example = new SimpleSpace(?options = { token: false, botID: false, client: false, log: false}); // Example varies

// Fetches the site statistics.
// options (?FetchOptions) => Fetch Options.
Example.fetchStats(?options);
Example.fetchStats(); // Example varies
Example.fetchStats({ specified: 'total' }); // Example varies.

// Post your guild count onto the site.
// guildSize (?Number) => The number OR array (for shards) provided. If you provide a client object on initialization, this is not needed. Providing a value overrides the autofill.
Example.setGuilds(?guildSize);
Example.setGuilds(10); // A message, code, and whether or not it succeeded.

// Fetch a bot from the site.
// botID (String) => The bot ID to fetch from the site.
// options (?FetchOptions) => Fetch Options.
Example.fetchBot(botID, ?options);
Example.fetchBot('463803888072523797'); // Example too large to show.
Example.fetchBot('463803888072523797', { specified: 'username' }); // Moddy ©

// Fetches the bot by using the ID supplied during initialization.
// options (?FetchOptions) => Fetch Options.
Example.fetchSelf(?options);
Example.fetchSelf(); // Example varies
Example.fetchSelf({ specified: 'username' }); // Example varies

// Fetches a server in the database.
// guildID (String) => The server ID to fetch.
// options (?FetchOptions) => Fetch Options.
Example.fetchGuild(guildID, ?options);
Example.fetchGuild('467868565073035284');
Example.fetchGuild('467868565073035284', { specified: 'username' });

// Fetch every bot that had been logged onto the site.
// kind (String) => To get either "bots" or "guilds"
// options (?FetchOptions) Fetch Options.
Example.fetchAll(kind, ?options);
Example.fetchAll('guilds'); // Example too large to show.
Example.fetchAll('bots', 'prefix'); // ['!', '.', '$', ...a lot more];

// Fetch a user that has logged onto the site.
// userID (String) => The user ID to fetch.
// options (?FetchOptions) Fetch Options.
Example.fetchUser(userID, ?options);
Example.fetchUser('235593018332282884'); // Example too large to show
Example.fetchUser('235593018332282884', { specified: 'username' }); // iRED

// Fetch a bot's upvotes in the past 24 hours.
// botID (String) => The bot ID to fetch upvotes from.
// ids (?Boolean) => Whether or not to return user IDs in place of the user objects.
Example.fetchUpvotes(botID, ?ids = false);
Example.fetchUpvotes('463803888072523797'); // Example varies
Example.fetchUpvotes('463803888072523797', true); // Example varies

// Fetch a bot's upvotes using the bot ID supplied on initialization.
// ids (?Boolean) => Whether or not to return user IDs in place of the user objects.
Example.fetchUpvotesSelf(?ids = false);
Example.fetchUpvotesSelf(); // Example varies
Example.fetchUpvotesSelf(true); // Example varies

// Edit a key-value pair in the instance.
// options (?SpaceOptions) => The options for initiation.
// options.token (?String) => The API token, required for some actions.
// options.botID (?String) => The bot ID for self functions.
// options.client (?discordjs.Client) => The client for initialization. Used for shortcut of setGuilds() without needing to supply a value.
// options.log (?Boolean) => Whether or not to log POST actions.
Example.edit(options);
Example.edit({ token: 'API_TOKEN' }); // { 'token': 'API_TOKEN', ... };
```

## Update Notes

### UPDATE!

Check [here](https://github.com/iREDMe/simple.space/releases) for releases; Check [here](https://github.com/iREDMe/simple.space/projects) for Projects and to know what's coming next.

If you want to get notified for whenever a release is up, join my [main server](https://discord.gg/eB3gK72)!

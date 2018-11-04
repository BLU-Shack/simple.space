<div style='text-align: center; '>
    <p>
        <img src='https://i.imgur.com/j5gEcTf.png' width=500 height=150>
    </p>
    <p>
        <a href='https://www.npmjs.com/package/simple.space'><img src='https://nodei.co/npm/simple.space.png'></a>
    </p>
</div>

# botlist.space - Alternative Wrapper

To install, use ``npm i simple.space``; But you already know that, right?

## What sets the difference than the original?

|Key Differences from [Main Package](https://www.npmjs.com/package/botlist.space)|Examples|
|-|-|
|Uses ``fetchThing()`` instead of ``getThing()``|``Client.fetchBot('botID')``|
|Includes FetchOptions|``Client.fetchGuild('guildID', { specified: 'name' })``|

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

<details>
<summary>Initialize The Package</summary>
<br>

```js
// First, you have to initialize the package. Obviously.
const SimpleSpace = require('simple.space');

// options (?SpaceOptions) => The options for initiation.
// options.token (?String) => The API token, required for some actions.
// options.botID (?String) => The bot ID for self functions.
// options.client (?discordjs.Client) => The client for initialization. Used for shortcut of setGuilds() without needing to supply a value.
// options.log (?Boolean) => Whether or not to log FETCH actions.
const Example = new SimpleSpace(?options = { token: false, botID: false, client: false, log: false}); // Example varies
```

</details>
<br>
<details>
<summary>Fetch the Site's Statistics</summary>
<br>

```js
// Fetches the site statistics.
// options (?FetchOptions) => Fetch Options.
Example.fetchStats(?options);
Example.fetchStats(); // Example varies
Example.fetchStats({ specified: 'total' }); // Example varies.
```

</details>
<br>
<details>
<summary>Post Guild Count to the Site</summary>
<br>

```js
// Post your guild count onto the site.
// options (PostOptions) => Post Options.
// options.guildSize (Number | Array<Number>) => The number/array of numbers to pass to the site.
// options.token (?String) => The API token to use. Overrides this.options.token
// options.botID (?String) => The Bot ID to use. Overrides this.options.botID
Example.setGuilds(?options);
Example.setGuilds({ guildSize: 69 }); // Don't bother.
Example.setGuilds({ guildSize: 1337, token: 'OOF' }); // You failed.
```

</details>
<br>
<details>
<summary>Fetch a Bot</summary>
<br>

```js
// Fetch a bot from the site.
// botID (String) => The bot ID to fetch from the site.
// options (?FetchOptions) => Fetch Options.
Example.fetchBot(botID, ?options);
Example.fetchBot('463803888072523797'); // Example too large to show.
Example.fetchBot('463803888072523797', { specified: 'username' }); // Moddy ©
```

</details>
<br>
<details>
<summary>Fetch a Bot using the ID from initialization</summary>
<br>

```js
// Fetches the bot by using the ID supplied during initialization.
// options (?FetchOptions) => Fetch Options.
Example.fetchSelf(?options);
Example.fetchSelf(); // Example varies
Example.fetchSelf({ specified: 'username' }); // Example varies
```

</details>
<br>
<details>
<summary>Fetch a Guild</summary>
<br>

```js
// Fetches a guild in the database.
// guildID (String) => The guild ID to fetch.
// options (?FetchOptions) => Fetch Options.
Example.fetchGuild(guildID, ?options);
Example.fetchGuild('467868565073035284');
Example.fetchGuild('467868565073035284', { specified: 'username' });
```

</details>
<br>
<details>
<summary>Fetch All Bots</summary>
<br>

```js
// Fetch all bots on the site.
// options (?FetchOptions) => Fetch Options.
Example.fetchAllBots(?options);
Example.fetchAllBots({ specified: 'prefix' }); // [ '!', '?', ... ]
Example.fetchAllBots({ stringify: true }); // [ '<@139823297389273>', '<@1337133713371337>', ... ]
```

</details>
<br>
<details>
<summary>Fetch All Guilds</summary>
<br>

```js
// Fetch all guilds on the site.
// options (?FetchOptions) => Fetch Options.
Example.fetchAllGuilds(?options);
Example.fetchAllGuilds({ specified: 'id' }); // [ '293829083209323', '1337133713371337', ... ]
Example.fetchAllGuilds({ stringify: true }); // [ 'iBLU' ]
```

</details>
<br>
<details>
<summary>Fetch a User</summary>
<br>

```js
// Fetch a user that has logged onto the site.
// userID (String) => The user ID to fetch.
// options (?FetchOptions) Fetch Options.
Example.fetchUser(userID, ?options);
Example.fetchUser('235593018332282884'); // Example too large to show
Example.fetchUser('235593018332282884', { specified: 'username' }); // iRED
```

</details>
<br>
<details>
<summary>Fetch Bot's Upvotes</summary>
<br>

```js
// Fetch a bot's upvotes in the past 24 hours.
// options (?UpvoteFetchOptions) => Upvote Fetch Options.
// options.ids (?Boolean) => Whether or not to only fetch the user IDs.
// options.token (?String) => The API token to supply.
Example.fetchUpvotes(?options);
Example.fetchUpvotes(); // Example varies
Example.fetchUpvotes({ ids: true }); // Example varies
```

</details>
<br>
<details>
<summary>Edit the ClientOptions</summary>
<br>

```js
// Edit a key-value pair in the instance.
// options (?SpaceOptions) => The options for initiation.
// options.token (?String) => The API token, required for some actions.
// options.botID (?String) => The bot ID for self functions.
// options.client (?discordjs.Client) => The client for initialization. Used for shortcut of setGuilds() without needing to supply a value.
// options.log (?Boolean) => Whether or not to log POST actions.
Example.edit(options);
Example.edit({ token: 'API_TOKEN' }); // { 'token': 'API_TOKEN', ... };
```

</details>

## Documentation

https://iredme.github.io/simple.space/

## Want to contribute?

### Found an Issue?

Go [here](https://github.com/iREDMe/simple.space/issues/new?template=ISSUE_TEMPLATE.md) to submit an issue.

### Want to Pull Request?

Well, go ahead and make one already.

## Update Notes

### UPDATE!

Check [here](https://github.com/iREDMe/simple.space/releases) for releases; Check [here](https://github.com/iREDMe/simple.space/projects) for Projects and to know what's coming next.

If you want to get notified for whenever a release is up, join my [main server](https://discord.gg/eB3gK72)!

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

|Differences from [Main Package](https://www.npmjs.com/package/botlist.space)|Examples|
|-|-|
|Uses ``fetchThing()`` instead of ``getThing()``|``Client.fetchBot('botID')``|
|Includes FetchOptions|``Client.fetchGuild('guildID', { specified: 'name' })``|
|Uses ``node-fetch`` instead of ``snekfetch``|No Code Example Here, Mate|
|Webhook Usage|``new Space.Webhook()`` (See Example #3)|

## Examples

<details>
<summary>An Example Format</summary>
<br>

```js
// something (Type) => A random definition.
// notNeeded (?Type) => An optional definition.
Options.example(something, ?notNeeded);
```

</details>
<br>
<details>
<summary>Initialize The Package</summary>
<br>

Initializing the package is how things work. ;P

```js
// Require the package!
const Space = require('simple.space');

// options (?ClientOptions) => The options for initiation.
// options.token (?string) => The API token, required for some actions.
// options.botID (?string) => The bot ID for self functions.
// options.client (?discordjs.Client) => The client for initialization. Used for shortcut of postCount() without needing to supply a value.
// options.log (?boolean) => Whether or not to log FETCH actions.
// options.cacheUpdateTimer (?number) => The # of milliseconds to wait for each automatic cache update. Set to 0 to disable.
// options.cache (?boolean) => Whether or not to enable caching.
const SpaceClient = new Space.Client(?options = { token: null, botID: null, client: null, log: false, cacheUpdateTimer: 180000, cache: false }); // Example varies
```

For future assumptions, let's say:
1. ``options.token`` is ``null``
2. ``options.botID`` is ``'228537642583588864'`` (id => [Vexera Bot](https://vexera.io))
3. ``options.client`` is ``null``
4. ``options.log`` is ``true`` because it can.
5. ``options.cacheUpdateTimer`` is its default, ``180000``
6. ``options.cache`` is true.

</details>
<br>
<details>
<summary>Utilize Cache and Events</summary>
<br>

When Events were planned out, cache was somehow shoved in. Events and Cache then combined to give events a more general purpose.

**When Cache is loaded for the first time:**
```js
SpaceClient.on('ready', (bots) => {
    console.log(bots.get('BotID').username) // Varies
});
```

**When Cache is updated**
```js
Client.on('cacheUpdateAll', (bots, emojis, guilds) => {
    const [animated, notAnimated] = emojis.split(emoji => emoji.animated); // Animated? I think not
    console.log(`${animated.size} emojis are animated, while ${notAnimated.size} are not animated.`); // As of 2018-11-25: 254 emojis are animated, while 922 are not animated.
});
```
**Note:** There is also ``cacheUpdateBots``, ``cacheUpdateEmojis``, and ``cacheUpdateGuilds``

**When a successful post is performed**
```js
Client.on('post', (info, count) => {
    console.log(`${info.code} ${info.message}`);
    console.log(`Successfully posted count ${count}!`)
})
```

</details>
<br>
<details>
<summary>Initializing a Webhook</summary>
<br>

Bots and Guilds listed on the site have an "Upvote URL" parameter where the site POSTs data to the endpoint URL given to the site. This was designed to simplify the usage of webhooks.

Some code is referenced from [dbl-api](https://www.npmjs.com/package/dbl-api)'s [source](https://github.com/xDimGG/dbl-api/blob/master/src/Client.js#L181) [code](https://github.com/xDimGG/dbl-api/blob/master/src/Util.js#L2)

```js
// options.port (?number) => The port to listen for.
// options.path (?string) => The path/endpoint to watch for POSTs.
// options.token (?string) => The bot/guild's API token to validate an upvote.
const Webhook = new Space.Webhook({ port: 1234, path: '/', token: null });

// Deactivate/reactivate the webhook.
Webhook.close().open();

// The upvote event.
Webhook.on('upvote', (body, headers) => {
    // Do something with the body and/or headers.
});
```

</details>
<br>
<details>
<summary>Fetch the Site's Statistics</summary>
<br>

```js
// options (?FetchOptions) => Fetch Options.
SpaceClient.fetchStats(?options);
SpaceClient.fetchStats(); // Example varies
SpaceClient.fetchStats({ specified: 'total' }); // Example varies.
```

</details>
<br>
<details>
<summary>Post Guild Count to the Site</summary>
<br>

```js
// options (PostOptions) => Post Options.
SpaceClient.postCount(?options);
SpaceClient.postCount(69); // Don't bother trying to run this if you have no token.
SpaceClient.postCount({ guildSize: 1337, token: 'OOF' }); // You failed.
```

</details>
<br>
<details>
<summary>Fetch a Bot</summary>
<br>

```js
// botID (string) => The bot ID to fetch from the site.
// options (?FetchOptions) => Fetch Options.
SpaceClient.fetchBot(botID, ?options);
SpaceClient.fetchBot('228537642583588864'); // Example too large
SpaceClient.fetchBot('228537642583588864', { specified: 'username' }); // Vexera
```

</details>
<br>
<details>
<summary>Fetch a Bot using the ID from initialization</summary>
<br>

Mirror for ``Space.fetchBot(this.options.botID, options)``

```js
// options (?FetchOptions) => Fetch Options.
SpaceClient.fetchSelf(?options);
SpaceClient.fetchSelf(); // Example too large
SpaceClient.fetchSelf({ specified: 'username' }); // Vexera
```

</details>
<br>
<details>
<summary>Fetch a Guild</summary>
<br>

```js
// guildID (string) => The guild ID to fetch.
// options (?FetchOptions) => Fetch Options.
SpaceClient.fetchGuild(guildID, ?options);
SpaceClient.fetchGuild('467868565073035284');
SpaceClient.fetchGuild('467868565073035284', { specified: 'name' }); // iRED's BLU Shack
```

</details>
<br>
<details>
<summary>Fetch All Bots</summary>
<br>

```js
// options (?FetchOptions) => Fetch Options.
SpaceClient.fetchAllBots(?options);
SpaceClient.fetchAllBots({ specified: 'prefix' }); // [ '!', '?', ... ]
SpaceClient.fetchAllBots({ stringify: true }); // [ '<@139823297389273>', '<@1337133713371337>', ... ]
```

</details>
<br>
<details>
<summary>Fetch All Guilds</summary>
<br>

```js
// options (?FetchOptions) => Fetch Options.
SpaceClient.fetchAllGuilds(?options);
SpaceClient.fetchAllGuilds({ specified: 'id' }); // [ '293829083209323', '1337133713371337', ... ]
SpaceClient.fetchAllGuilds({ stringify: true }); // [ 'iBLU' ]
```

</details>
<br>
<details>
<summary>Fetch a User</summary>
<br>

```js
// userID (string) => The user ID to fetch.
// options (?FetchOptions) Fetch Options.
SpaceClient.fetchUser(userID, ?options);
SpaceClient.fetchUser('235593018332282884'); // Example too large to show
SpaceClient.fetchUser('235593018332282884', { specified: 'username' }); // iRED
```

</details>
<br>
<details>
<summary>Fetch Bot's Upvotes</summary>
<br>

```js
// options (?UpvoteFetchOptions) => Upvote Fetch Options.
SpaceClient.fetchUpvotes(?options);
SpaceClient.fetchUpvotes(); // Example varies
SpaceClient.fetchUpvotes({ ids: true }); // Example varies
```

</details>
<br>
<details>
<summary>Check If User Upvoted Bot</summary>
<br>

(A copy and paste from the site): If you are using upvote data for specific time-sensitive features (such as in-bot rewards), then you may consider using Webhooks for upvote events instead.

```js
// userID (string | string[]) => A user ID/array of user IDs to test against.
// options (?UpvoteFetchOptions) => Upvote Fetch Options.
SpaceClient.hasUpvoted(userID, ?options);
SpaceClient.hasUpvoted('235593018332282884'); // false(?)
SpaceClient.hasUpvoted(['235593018332282884', '267445058268037121']); // A Store
SpaceClient.hasUpvoted(['235593018332282884', '267445058268037121'], { ids: true }); // An array containing only the users who have upvoted.
```

You can use this package's Webhook class for easy usage. See Example #3.

</details>
<br>
<details>
<summary>Edit the ClientOptions</summary>
<br>

```js
// options (?SpaceOptions) => The options for initiation.
SpaceClient.edit(options);
SpaceClient.edit({ token: 'API_TOKEN' }); // { 'token': 'API_TOKEN', ... };
```

</details>

## Full JSDoc Documentation

https://blu-shack.github.io/simple.space/

## Contributing

- Find out [here](https://github.com/BLU-Shack/simple.space/blob/master/.github/CONTRIBUTING.md)!
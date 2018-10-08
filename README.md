# botlist.space - Alternate Package

A simplified alternative package to [the official](https://www.npmjs.com/package/botlist.space). :)

To install, use ``npm i simple.space``; But you already know that, right?

## Examples

```js
// First, you have to initialize the package. Obviously.
const SimpleSpace = require('simple.space');

// token (String) => The API token from botlist.space; Required for some functions. If not needed, use 'none'.
// botID (string) => The bot ID, used for self functions. If not needed, use 'none'.
// client (?ClientObject) => The client object. Used for setCount() if no value is provided. Probably not needed, so use undefined.
// log (?Boolean) => Whether or not to log any POST actions. Recommended value is false. Useful if you want to know whenever something happens I guess?
const SimpleAPI = new SimpleSpace(token, botID, ?client, ?log);

// Post your server count onto the site.
// serverSize (?Number) => The number OR array (for shards) provided. If you provide a client object on initialization, this is not needed. Providing a value overrides the autofill.
SimpleAPI.setCount(?serverSize);
SimpleAPI.setCount(10);

// Fetch a bot from the site.
// botID (String) => The bot ID to fetch from the site.
// specified (?String) => The specific value to receive.
SimpleAPI.fetchBot(botID, ?specified);
SimpleAPI.fetchBot('463803888072523797');
SimpleAPI.fetchBot('463803888072523797', 'username'); // Moddy ©

// Fetches the bot by using the ID supplied during initialization.
// specified (?String) => The specific value to receive.
SimpleAPI.fetchSelf(?specified);
SimpleAPI.fetchSelf();
SimpleAPI.fetchSelf('username');

// Fetches the site statistics.
// specified (?String) => The specific value to receive.
SimpleAPI.fetchStats(?specified);
SimpleAPI.fetchStats();
SimpleAPI.fetchStats('users');
```

## Update Notes Section

### v1 Section

#### v1.0.4

* Fixed the fetchBot() function.

#### v1.0.3

* Updated values, specifically ``token`` and ``botID`` if you supply ``'none'``; It will turn into false.

#### v1.0.1

* First things. Lol.
* Thing here.
* Thing there.
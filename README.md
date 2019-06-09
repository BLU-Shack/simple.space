<div style='text-align: center; '>
    <p>
        <img src='https://i.imgur.com/j5gEcTf.png' width=500 height=150>
    </p>
    <p>
        <a href='https://www.npmjs.com/package/simple.space'><img src='https://nodei.co/npm/simple.space.png'></a>
    </p>
</div>

# simple.space - An API wrapper for botlist.space

To install, use `npm i simple.space`

## What sets the difference than the original?

| [botlist.space](https://www.npmjs.com/package/botlist.space)    | simple.space                                                 |
|-----------------------------------------------------------------|--------------------------------------------------------------|
| `Client.getBot('1234')`                                         | `Client.fetchBot('1234')`                                    |
| `Client.getSelfBot()`                                           | `Client.fetchBot()` (omit id -> Use options.botID)           |
| `Client.postServerCount(1)` OR `Client.postServerCount([1, 2])` | `Client.postCount('1234', { countOrShards: (1 OR [1, 2]) })` |
| No cache built-in                                               | Caching is disabled by default.                              |

## Full JSDoc Documentation

https://blu-shack.github.io/simple.space/

## Contributing

- Find out [here](https://github.com/BLU-Shack/simple.space/blob/master/.github/CONTRIBUTING.md)!
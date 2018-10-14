const SpaceOptions = require('./SpaceOptions');

const Base = require('./bases/Base');

const NonGuildBase = require('./bases/NonGuildBase');

const Bases = { Base, NonGuildBase };

const Bot = require('./Bot');

const User = require('./User');

const Guild = require('./Guild');

const FetchOptions = require('./FetchOptions');

module.exports = { SpaceOptions, Bot, User, FetchOptions, Bases, Guild };
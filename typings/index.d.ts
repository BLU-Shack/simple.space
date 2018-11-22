// Type definitions for simple.space v2.3.0
// Project: https://github.com/BLU-Shack/simple.space
// Definitions by:
//   iREDMe <foodrickme@gmail.com> (https://github.com/iREDMe)
// License: MIT

declare module 'simple.space' {
    import { EventEmitter } from "events";

    export const version: string;
    export class Client extends EventEmitter {
        constructor(options?: ClientOptions);
        private static isObject(obj: any): boolean;
        private _runCache(): Promise<object>;

        public static endpoint: string;
        public bots: Store<string, Bot>;
        public emojis: Store<string, Emoji>;
        public guilds: Store<string, Guild>;
        public options: ClientOptions;
        public readyAt?: Date;
        public readyTimestamp?: number;
        public edit(options?: ClientOptions, preset?: boolean): ClientOptions;
        public fetchAllBots(options?: FetchOptions<BotSVs>): Promise<Bot[]>;
        public fetchAllEmojis(options?: FetchOptions<EmojiSVs>): Promise<Emoji[]>;
        public fetchAllGuilds(options?: FetchOptions<GuildSVs>): Promise<Guild[]>;
        public fetchBot(botID: string, options?: FetchOptions<BotSVs>): Promise<Bot>;
        public fetchEmoji(emojiID: string, options?: FetchOptions<EmojiSVs>): Promise<Emoji>;
        public fetchGuild(guildID: string, options?: FetchOptions<GuildSVs>): Promise<Guild>;
        public fetchGuildEmojis(guildID: string, options?: FetchOptions<EmojiSVs>): Promise<Emoji[]>;
        public fetchSelf(options?: FetchOptions<BotSVs>): Promise<Bot>;
        public fetchStats(options?: FetchOptions<StatsSVs>): Promise<Stats>;
        public fetchUpvotes(options?: UpvoteFetchOptions<UpvoteUserSVs>): Promise<UpvoteUser[] | string[]>;
        public fetchUser(userID: string, options?: FetchOptions<UserSVs>): Promise<User>;
        public hasUpvoted(userID: string | string[], log?: boolean): Promise<boolean | Store<string, boolean>>;
        public setGuilds(options?: PostOptions): Promise<object>;
        public postCount(options?: PostOptions): Promise<object>;

        public on(event: 'cacheUpdateBots', listener: (data: Store<string, Bot>) => void): this;
        public on(event: 'cacheUpdateEmojis', listener: (data: Store<string, Emoji>) => void): this;
        public on(event: 'cacheUpdateGuilds', listener: (data: Store<string, Guild>) => void): this;
        public on(event: 'ready' | 'cacheUpdateAll', listener: (data: { bots: Store<string, Bot>, emojis: Store<string, Emoji>, guilds: Store<string, Guild> }) => void): this;
        public on(event: 'post', listener: (info: object) => void): this;

        public once(event: 'cacheUpdateBots', listener: (data: Store<string, Bot>) => void): this;
        public once(event: 'cacheUpdateEmojis', listener: (data: Store<string, Emoji>) => void): this;
        public once(event: 'cacheUpdateGuilds', listener: (data: Store<string, Guild>) => void): this;
        public once(event: 'ready' | 'cacheUpdateAll', listener: (data: { bots: Store<string, Bot>, emojis: Store<string, Emoji>, guilds: Store<string, Guild> }) => void): this;
        public once(event: 'post', listener: (info: object) => void): this;
    }

    export class Base {
        constructor(base: object);
        public id: string;
    }

    export class Bot extends Base {
        constructor(bot: object);
        private bot: object;

        public avatar: string;
        public discriminator: string;
        public fullDescription?: string;
        public guildSize?: number;
        public inviteURL: string;
        public isApproved: boolean;
        public isChildFriendly: boolean;
        public isFeatured: boolean;
        public library: string;
        public prefix: string;
        public shards?: number[];
        public shortDescription: string;
        public supportCode?: string;
        public timestamp: number;
        public user: string;
        public vanity?: string;
        public readonly inviteNoPerms: string;
        public readonly serverCount?: number;
        public readonly supportURL?: string;
        public readonly tag: string;
        public readonly url: string;
        public readonly vanityURL?: string;
        public owners(options?: FetchOptions<UserSVs>): PartialUser[];
        public toString(): string;
    }

    export class ClientOptions {
        constructor(newObj: object, oldObj?: object);
        private readonly default: {
            cache: false,
            cacheUpdateTimer: 180000,
            client: null,
            botID: null,
            token: null,
            log: false
        }

        public cache?: boolean;
        public cacheUpdateTimer?: number;
        public token?: string;
        public botID?: string;
        public client?: any;
        public log?: boolean;
    }

    export class Emoji extends Base {
        constructor(emoji: object);
        private emoji: object;

        public animated: boolean;
        public name: string;
        public imageURL: string;
        public readonly normalGuild: object;
        public readonly guild: Guild;
        public readonly raw: string;
        public readonly url: string;
        public toString(): string;
    }

    export class FetchError extends Error {
        constructor(error: object, name: string);
        public message: string;
        public name: string;
        public toString(): string;
    }

    export class FetchOptions<T> {
        constructor(options?: object, preset?: ClientOptions);
        public log?: boolean;
        public specified?: T;
        public normal?: boolean;
        public stringify?: boolean;
    }

    export class Guild extends Base {
        constructor(guild: object);
        private guild: object;

        public compliance: boolean;
        public fullDescription?: string;
        public icon: string;
        public isChildFriendly: boolean;
        public isFeatured: boolean;
        public isPremium: boolean;
        public isPublic: boolean;
        public memberCount: number;
        public name: string;
        public shortDescription: string;
        public timestamp: number;
        public vanity?: string;
        public readonly url: string;
        public readonly vanityURL?: string;
        public owners(options?: FetchOptions<UserSVs>): PartialUser[];
    }

    export class PartialUser extends Base {
        constructor(partialUser: object);
        private user: object;

        public avatar: string;
        public discriminator: string;
        public githubUsername?: string;
        public gitlabUsername?: string;
        public shortDescription?: string;
        public readonly githubURL?: string;
        public readonly gitlabURL?: string;
        public readonly tag: string;
        public readonly url: string;
        public username: string;
        public toString(): string;
    }

    export class PostOptions {
        constructor(options: object, preset?: ClientOptions);
        public client?: any;
        public botID?: string;
        public guildSize?: number | number[];
        public token?: string;
        public readonly data: string;
    }

    export class Stats {
        constructor(stats: object);
        private stats: object;

        public bots: {
            total: number,
            approved: number,
            unapproved: number
        }
        public guilds: number;
        public successful: boolean;
        public users: number;
        public readonly combined: number;
    }

    export class Store<K, V> extends Map<K, V> {
        public array(): V[];
        public filter(func: (v: V, k: K, s: Store<K, V>) => boolean, bind?: any): Store<K, V>;
        public indexOf(key: K, fromIndex?: number): number;
        public keyArray(): K[];
        public lastIndexOf(key: K, fromIndex?: number): number;
        public map<T>(func: (v: V, k: K, s: Store<K, V>) => T, bind?: any): T[];
        public random(): V;
        public randomKey(): K;
        public randomPair(): (K | V)[];
        public split(func: (v: V, k: K, s: Store<K, V>) => boolean, bind?: any): [Store<K, V>, Store<K, V>];
    }

    export class UpvoteFetchOptions<T> extends FetchOptions<T> {
        constructor(options?: object, client?: ClientOptions);
        public ids?: boolean;
        public token?: string;
        public botID?: string;
    }

    export class User extends PartialUser {
        constructor(user: object);
        public bots(options?: FetchOptions<BotSVs>): Bot[];
        public guilds(options?: FetchOptions<GuildSVs>): Guild[];
    }

    export class UpvoteUser {
        constructor(body: object);
        public timestamp: number;
        public user: PartialUser;
    }
}

type BotSVs =   'id'            | 'bot'                 | 'avatar'          |
                'discriminator' | 'fullDescription'     | 'guildSize'       |
                'inviteURL'     | 'isApproved'          | 'isChildFriendly' |
                'isFeatured'    | 'library'             | 'prefix'          |
                'shards'        | 'shortDescription'    | 'supportCode'     |
                'timestamp'     | 'username'            | 'vanity'          |
                'serverCount'   | 'inviteNoPerms'       | 'supportURL'      |
                'tag'           | 'url'                 | 'vanityURL';

type EmojiSVs = 'id'    | 'emoji'       | 'animated'    |
                'name'  | 'imageURL'    | 'normalGuild' |
                'guild' | 'raw'         | 'url';

type GuildSVs = 'id'                | 'guild'       | 'compliance'          |
                'fullDescription'   | 'icon'        | 'isChildFriendly'     |
                'isFeatured'        | 'isPremium'   | 'isPublic'            |
                'memberCount'       | 'name'        | 'shortDescription'    |
                'timestamp'         | 'vanity'      | 'url'                 |
                'vanityURL';

type UserSVs =  'id'                | 'user'            | 'avatar'          |
                'discriminator'     | 'githubUsername'  | 'gitlabUsername'  |
                'shortDescription'  | 'username'        | 'githubURL'       |
                'gitlabURL'         | 'tag'             | 'url';

type UpvoteUserSVs = UserSVs | 'timestamp';

type StatsSVs = 'bots'          | 'guilds'  | 'successful'    |
                'users'         | 'total'   | 'approved'      |
                'unapproved'    | 'combined';
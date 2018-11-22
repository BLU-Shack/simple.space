// Type definitions for simple.space v2.2.4
// Project: https://github.com/BLU-Shack/simple.space
// Definitions by:
//   iREDMe <foodrickme@gmail.com> (https://github.com/iREDMe)
// License: MIT

declare module 'simple.space' {
    import { EventEmitter } from "events";

    export const version: string;
    export class Client extends EventEmitter {
        constructor(options?: ClientOptions);
        private _runCache(): Promise<object>;
        private static isObject(obj: any): boolean;

        public static endpoint: string;
        public bots: Store<string, Bot>;
        public emojis: Store<string, Emoji>;
        public guilds: Store<string, Guild>;
        public options: ClientOptions;
        public readyAt?: Date;
        public readyTimestamp?: number;
        public edit(options?: ClientOptions, preset?: boolean): ClientOptions;
        public fetchAllBots(options?: FetchOptions): Promise<Bot[]>;
        public fetchAllEmojis(options?: FetchOptions): Promise<Emoji[]>;
        public fetchAllGuilds(options?: FetchOptions): Promise<Guild[]>;
        public fetchBot(botID: string, options?: FetchOptions): Promise<Bot>;
        public fetchEmoji(emojiID: string, options?: FetchOptions): Promise<Emoji>;
        public fetchGuild(guildID: string, options?: FetchOptions): Promise<Guild>;
        public fetchGuildEmojis(guildID: string, options?: FetchOptions): Promise<Emoji[]>;
        public fetchSelf(options?: FetchOptions): Promise<Bot>;
        public fetchStats(options?: FetchOptions): Promise<Stats>;
        public fetchUpvotes(options?: UpvoteFetchOptions): Promise<PartialUser[]>;
        public fetchUser(userID: string, options?: FetchOptions): Promise<User>;
        public hasUpvoted(userID: string): Promise<boolean>;
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
        public inviteNoPerms: string;
        public inviteURL: string;
        public isApproved: boolean;
        public isChildFriendly: boolean;
        public isFeatured: boolean;
        public library: string;
        public prefix: string;
        public serverCount?: number;
        public shards?: number[];
        public shortDescription: string;
        public supportCode?: string;
        public supportURL?: string;
        public tag: string;
        public timestamp: number;
        public url: string;
        public user: string;
        public vanity?: string;
        public vanityURL?: string;
        public owners(options?: FetchOptions): PartialUser[];
        public toString(): string;
    }

    export class ClientOptions {
        constructor(newObj: object, oldObj?: object);
        private default: object;

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
        public normalGuild: object;
        public guild: Guild;
        public raw: string;
        public url: string;
        public toString(): string;
    }

    export class FetchError extends Error {
        constructor(error: object, name: string);
        public message: string;
        public name: string;
        public toString(): string;
    }

    export class FetchOptions {
        constructor(options?: object, preset?: ClientOptions);
        public log?: boolean;
        public specified?: Specifiable;
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
        public url: string;
        public vanity?: string;
        public vanityURL?: string;
        public owners(options?: FetchOptions): PartialUser[];
    }

    export class PartialUser extends Base {
        constructor(partialUser: object);
        private user: object;

        public avatar: string;
        public discriminator: string;
        public githubURL?: string;
        public githubUsername?: string;
        public gitlabURL?: string;
        public gitlabUsername?: string;
        public shortDescription?: string;
        public tag: string;
        public url: string;
        public username: string;
        public toString(): string;
    }

    export class PostOptions {
        constructor(options: object, preset?: ClientOptions);
        public client?: any;
        public botID?: string;
        public guildSize?: number | number[];
        public token?: string;
        public data: string;
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
        public total: number;
        public users: number;
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

    export class UpvoteFetchOptions extends FetchOptions {
        constructor(options?: object, client?: ClientOptions);
        public ids?: boolean;
        public token?: string;
        public botID?: string;
    }

    export class User extends PartialUser {
        constructor(user: object);
        public bots(options?: FetchOptions): Bot[];
        public guilds(options?: FetchOptions): Guild[];
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
                'timestamp'     | 'username'            | 'vanity';

type EmojiSVs = 'id'    | 'emoji'   | 'animated' |
                'name'  | 'imageURL';

type GuildSVs = 'id'                | 'guild'       | 'compliance'          |
                'fullDescription'   | 'icon'        | 'isChildFriendly'     |
                'isFeatured'        | 'isPremium'   | 'isPublic'            |
                'memberCount'       | 'name'        | 'shortDescription'    |
                'timestamp'         | 'vanity';

type UserSVs = 'id'                 | 'user'            | 'avatar'          |
               'discriminator'      | 'githubUsername'  | 'gitlabUsername'  |
               'shortDescription'   | 'username';

type Specifiable = BotSVs | EmojiSVs | GuildSVs | UserSVs;
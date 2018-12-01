// Type definitions for simple.space v2.3.0
// Project: https://github.com/BLU-Shack/simple.space
// Definitions by:
//   iREDMe <foodrickme@gmail.com> (https://github.com/iREDMe)
// License: MIT

declare module 'simple.space' {
    import { EventEmitter } from 'events';
    import { Express } from 'express';
    export const version: string;

    //#region Classes
    /** The Client for interacting with botlist.space */
    export class Client extends EventEmitter {
        constructor(options?: ClientOptions);
        private static isObject(obj: any): boolean;
        private _runCache(): Promise<object>;

        public static events: ClientEvent[];
        public static endpoint: string;
        public bots: Store<string, Bot>;
        public emojis: Store<string, Emoji>;
        public guilds: Store<string, Guild>;
        public nextCacheUpdate?: NodeJS.Timer;
        public options: ClientOptions;
        public readyAt?: Date;
        public readonly readyTimestamp?: number;

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
        public hasUpvoted(userID: string[], options?: UpvoteFetchOptions<any>): Promise<Store<string, boolean> | string[]>;
        public hasUpvoted(userID: string, options?: UpvoteFetchOptions<any>): Promise<boolean>;
        public setGuilds(options?: PostOptions): Promise<object>;
        public postCount(options?: number | PostOptions): Promise<object>;

        public on(event: string, listener: Function): this;
        public on(event: 'cacheUpdateBots', listener: (data: Store<string, Bot>) => void): this;
        public on(event: 'cacheUpdateEmojis', listener: (data: Store<string, Emoji>) => void): this;
        public on(event: 'cacheUpdateGuilds', listener: (data: Store<string, Guild>) => void): this;
        public on(event: 'ready' | 'cacheUpdateAll', listener: (bots: Store<string, Bot>, emojis: Store<string, Emoji>, guilds: Store<string, Guild>) => void): this;
        public on(event: 'post', listener: (info: { code: number, message: string }, guildSize: number | number[]) => void): this;

        public once(event: string, listener: Function): this;
        public once(event: 'cacheUpdateBots', listener: (data: Store<string, Bot>) => void): this;
        public once(event: 'cacheUpdateEmojis', listener: (data: Store<string, Emoji>) => void): this;
        public once(event: 'cacheUpdateGuilds', listener: (data: Store<string, Guild>) => void): this;
        public once(event: 'ready' | 'cacheUpdateAll', listener: (bots: Store<string, Bot>, emojis: Store<string, Emoji>, guilds: Store<string, Guild>) => void): this;
        public once(event: 'post', listener: (info: { code: number, message: string }, guildSize: number | number[]) => void): this;
    }

    /** Introduces a simplified way of detecting upvotes. */
    export class Webhook {
        constructor(options?: WebhookOptions);
        private handler: Function;

        public app: Express;
        public active: boolean;
        public events: WebhookEvent[];
        public options: WebhookOptions;
        public edit(options?: WebhookOptions, preset?: boolean): WebhookOptions;
        public handle(): boolean;
        public close(): Webhook;
        public open(): Webhook;

        public on(event: string, listener: Function): this;
        public on(event: 'upvote', listener: (contents: UpvoteInfo, headers: Headers) => void): this;
        public on(event: 'error', listener: (error: Error) => void): this;

        public once(event: string, listener: Function): this;
        public once(event: 'upvote', listener: (contents: UpvoteInfo, headers: Headers) => void): this;
        public once(event: 'error', listener: (error: Error) => void): this;
    }

    /** The universal base for Bot, Emoji, Guild, and PartialUser classes. */
    export class Base {
        constructor(base: object);
        public id: string;
    }

    /** Represents a Bot on the site. */
    export class Bot extends Base {
        constructor(bot: object);
        private readonly bot: object;

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

    /** Options passed when initializing the Client. */
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

    /** Represents an Emoji on the site. */
    export class Emoji extends Base {
        constructor(emoji: object);
        private readonly emoji: object;

        public animated: boolean;
        public name: string;
        public imageURL: string;
        public readonly normalGuild: object;
        public readonly guild: Guild;
        public readonly raw: string;
        public readonly url: string;
        public toString(): string;
    }

    /** When an error is caught while fetching, this is thrown. */
    export class FetchError extends Error {
        constructor(error: object, name: string);
        public message: string;
        public name: string;
        public toString(): string;
    }

    /** Options when Fetching. */
    export class FetchOptions<T> {
        constructor(options?: object, preset?: ClientOptions);
        public log?: boolean;
        public specified?: T;
        public normal?: boolean;
        public stringify?: boolean;
    }

    /** Represents a Guild on the site. */
    export class Guild extends Base {
        constructor(guild: object);
        private readonly guild: object;

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

    /** Represents a user on the site with limited information. */
    export class PartialUser extends Base {
        constructor(partialUser: object);
        private readonly user: object;

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

    /** Options that are passed when posting the guild count. */
    export class PostOptions {
        constructor(options: object, preset?: ClientOptions);
        public client?: any;
        public botID?: string;
        public guildSize?: number | number[];
        public token?: string;
        public readonly data: string;
    }

    /** Represents the site's statistics information. */
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

    /** A [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
     * with additional utility methods. Its module can be found
     * [here](https://www.npmjs.com/package/@ired_me/red-store)
    */
    export import Store = require('@ired_me/red-store');

    /** Fetch Options but for when fetching Upvotes. */
    export class UpvoteFetchOptions<T> extends FetchOptions<T> {
        constructor(options?: object, client?: ClientOptions);
        public ids?: boolean;
        public token?: string;
        public botID?: string;
    }

    /** Represents a user with full information on the site. */
    export class User extends PartialUser {
        constructor(user: object);
        public bots(options?: FetchOptions<BotSVs>): Bot[];
        public guilds(options?: FetchOptions<GuildSVs>): Guild[];
    }

    /** Represents a user fetched through checking a Bot's upvotes. */
    export class UpvoteUser {
        constructor(body: object);
        public timestamp: number;
        public user: PartialUser;
    }
    //#endregion

    //#region Typedefs
    type BotSVs = 'id' | 'bot' | 'avatar' |
        'discriminator' | 'fullDescription' | 'guildSize' |
        'inviteURL' | 'isApproved' | 'isChildFriendly' |
        'isFeatured' | 'library' | 'prefix' |
        'shards' | 'shortDescription' | 'supportCode' |
        'timestamp' | 'username' | 'vanity' |
        'serverCount' | 'inviteNoPerms' | 'supportURL' |
        'tag' | 'url' | 'vanityURL';

    type EmojiSVs = 'id' | 'emoji' | 'animated' |
        'name' | 'imageURL' | 'normalGuild' |
        'guild' | 'raw' | 'url';

    type GuildSVs = 'id' | 'guild' | 'compliance' |
        'fullDescription' | 'icon' | 'isChildFriendly' |
        'isFeatured' | 'isPremium' | 'isPublic' |
        'memberCount' | 'name' | 'shortDescription' |
        'timestamp' | 'vanity' | 'url' |
        'vanityURL';

    type UserSVs = 'id' | 'user' | 'avatar' |
        'discriminator' | 'githubUsername' | 'gitlabUsername' |
        'shortDescription' | 'username' | 'githubURL' |
        'gitlabURL' | 'tag' | 'url';

    type UpvoteUserSVs = UserSVs | 'timestamp';

    type StatsSVs = 'bots' | 'guilds' | 'successful' |
        'users' | 'total' | 'approved' |
        'unapproved' | 'combined';

    type WebhookOptions = {
        port?: number,
        path?: string,
        token?: string
    }

    type UpvoteInfo = {
        bot?: string,
        server?: string
        timestamp: number,
        user: LesserUser
    }

    type LesserUser = {
        avatar: string,
        disciminator: string,
        id: string,
        short_description: string | boolean,
        username: string
    }

    type ClientEvent = 'ready' | 'post' | 'cacheUpdateAll' | 'cacheUpdateBots' | 'cacheUpdateEmojis' | 'cacheUpdateGuilds';

    type WebhookEvent = 'upvote' | 'error';

    type Headers = {
        authorization: string,
        host: string,
        'content-type': string,
        'user-agent': string,
        'content-length': string,
        'accept-encoding': string,
        'x-forwarded-for': string
    }
    //#endregion
}
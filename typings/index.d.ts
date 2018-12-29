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

        public static endpoint: string;
        public bots: Store<string, Bot>;
        public emojis: Store<string, Emoji>;
		public guilds: Store<string, Guild>;
		public users: Store<string, User>;
        public nextCache?: NodeJS.Timer;
        public options: ClientOptions;

        public edit(options?: ClientOptions, preset?: boolean): ClientOptions;
        public fetchAllBots(options?: FetchOptions): Promise<Bot[]>;
        public fetchBot(botID: string, options?: FetchOptions): Promise<Bot>;
        public fetchStats(options?: FetchOptions): Promise<Stats>;
    }

    /** The universal base for Bot, Emoji, Guild, and PartialUser classes. */
    export class Base {
        constructor(base: object);
		public id: string;
		public readonly raw: object;
    }

    /** Represents a Bot on the site. */
    export class Bot extends Base {
		constructor(bot: object);

		public approved: boolean;
		public avatar: string;
		public childFriendlyAvatar: boolean;
		public createdAt: number;
		public discriminator: string;
		public fullDescription: string;
		public invite: string;
		public inviteCount: number;
		public inviteNoPerms: string;
		public prefix: string;
		public serverCount?: number;
		public supportCode?: string;
		public updatedAt: number;
		public upvotes: number;
		public username: string;
		public vanity?: string;
		public readonly owners: User[];
		public readonly shards: number[];
		public readonly supportURL?: string;
		public readonly tag: string;
		public readonly tags: string[];

		public toString(): string;
    }

    /** Represents an Emoji on the site. */
    export class Emoji extends Base {
        constructor(emoji: object);

        public animated: boolean;
        public name: string;
        public imageURL: string;
        public readonly normalGuild: object;
        public readonly guild: Guild;
        public readonly url: string;

        public toString(): string;
    }

    /** When an error is caught while fetching, this is thrown. */
    export class FetchError extends Error {
		constructor(message: string, code: string, name?: string);

		public message: string;
		public readonly name: 'FetchError';

		public toString(): string;
	}

    /** Represents a Guild on the site. */
    export class Guild extends Base {
        constructor(guild: object);

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
    }

    /** Represents a user on the site with limited information. */
    export class PartialUser extends Base {
        constructor(partialUser: object);

        public avatar: string;
        public discriminator: string;
        public githubUsername?: string;
        public gitlabUsername?: string;
        public shortDescription?: string;
        public username: string;
        public readonly githubURL?: string;
        public readonly gitlabURL?: string;
        public readonly tag: string;
        public readonly url: string;

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
        private raw: object;

		public totalBots: number;
		public approvedBots: number;
		public unapprovedBots: number;
		public users: number;
		public readonly combinedTotal: number;
    }

    /** Represents a user with full information on the site. */
    export class User {
        constructor(user: object);

		public avatar: string;
		public description: string;
		public discriminator: string;
		public username: string;
		public readonly bots: Bot[];
		public readonly tag: string;

		public toString(): string;
    }

    /** Represents upvote contents fetched through checking a Bot's upvotes. */
    export class UpvoteContents {
        constructor(body: object);

        public timestamp: number;
        public user: PartialUser;
	}

	//#endregion
	
	//#region Options

	interface ClientOptions {
		autoCache?: boolean,
		autoCacheInterval?: number,
		cache?: boolean,
		botID?: string,
		botToken?: string,
		userToken?: string,
	}

	interface FetchOptions {
		cache?: boolean,
		mapify?: boolean
	}

	/** Fetch Options but for when fetching Upvotes. */
	interface UpvoteFetchOptions extends FetchOptions {
		ids?: boolean;
		token?: string;
		botID?: string;
	}
	//#endregion

    //#region Typedefs

    //#endregion
}
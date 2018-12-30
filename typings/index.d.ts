// Type definitions for simple.space v3.0.0
// Project: https://github.com/BLU-Shack/simple.space
// Definitions by:
//   iREDMe <foodrickme@gmail.com> (https://github.com/iREDMe)
// License: MIT

declare module 'simple.space' {
	import { EventEmitter } from 'events';
	import { Express } from 'express';
	import Store from '@ired_me/red-store';
	export const version: string;

	//#region Classes
	/** The Client for interacting with botlist.space */
	export class Client extends EventEmitter {
		constructor(options?: ClientOptions);

		public static endpoint: string;
		public _nextCache?: NodeJS.Timer;
		public bots: Store<string, Bot>;
		public emojis: Store<string, Emoji>;
		public guilds: Store<string, Guild>;
		public users: Store<string, User>;
		public options: ClientOptions;

		public edit(options?: ClientOptions, preset?: boolean): ClientOptions;
		public fetchAllBots(options?: FetchOptions): Promise<Bot[] | Store<string, Bot>>;
		public fetchBot(id?: string | FetchOptions, options?: FetchOptions): Promise<Bot>;
		public fetchStats(options?: FetchOptions): Promise<Stats>;
		public fetchUser(id: string, options?: FetchOptions): Promise<User>;

		public on(event: 'cacheUpdate', listener: (cache: UpdatedCache) => void): this;
		public once(event: 'cacheUpdate', listener: (cache: UpdatedCache) => void): this;
		public addListener(event: 'cacheUpdate', listener: (cache: UpdatedCache) => void): this;
		public removeListener(event: 'cacheUpdate', listener: (cache: UpdatedCache) => void): this;
	}

	/** The universal base for all classes. */
	export class Base {
		constructor(base: object);
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
		public id: string;
		public invite: string;
		public inviteCount: number;
		public inviteNoPerms: string;
		public prefix: string;
		public updatedAt: number;
		public upvotes: number;
		public username: string;
		public serverCount?: number;
		public supportCode?: string;
		public vanity?: string;
		public readonly tag: string;
		public readonly tags: string[];
		public readonly page: string;
		public readonly owners?: User[];
		public readonly shards?: number[];
		public readonly supportURL?: string;
		public readonly vanityURL?: string;

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
		public icon: string;
		public isChildFriendly: boolean;
		public isFeatured: boolean;
		public isPremium: boolean;
		public isPublic: boolean;
		public memberCount: number;
		public name: string;
		public shortDescription: string;
		public timestamp: number;
		public fullDescription?: string;
		public vanity?: string;

		public readonly url: string;
		public readonly vanityURL?: string;
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

		public readonly page: string;
		public readonly tag: string;
		public readonly bots?: Bot[];

		public toString(): string;
	}

	/** Represents upvote contents fetched through checking a Bot's upvotes. */
	export class UpvoteContents {
		constructor(body: object);

		public timestamp: number;
		public user: User;
	}

	//#endregion

	//#region Options

	type ClientOptions = {
		autoCache?: boolean;
		autoCacheInterval?: number;
		cache?: boolean;
		botID?: string;
		botToken?: string;
		userToken?: string;
	}

	type FetchOptions = {
		cache?: boolean;
		mapify?: boolean;
	}

	type UpvoteFetchOptions = FetchOptions & {
		ids?: boolean;
		token?: string;
		botID?: string;
	}

	type PostOptions = {
		botToken?: string;
		countOrShards: number | number[]
	}

	//#endregion

	//#region Typedefs

	interface UpdatedCache {
		bots: Store<string, Bot>;
		emojis: Store<string, Emoji>;
		guilds: Store<string, Guild>;
		users: Store<string, User>;
	}

	//#endregion
}
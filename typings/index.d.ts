// Type definitions for simple.space v3.0.0
// Project: https://github.com/BLU-Shack/simple.space
// Definitions by:
//   iREDMe <foodrickme@gmail.com> (https://github.com/iREDMe)
// License: MIT

declare module 'simple.space' {
	import { EventEmitter } from 'events';
	import Store from '@ired_me/red-store';
	export const version: string;

	//#region Classes
	/** The Client for interacting with botlist.space */
	export class Client extends EventEmitter {
		constructor(options?: ClientOptions);

		public endpoint: string;
		public _nextCache?: NodeJS.Timeout;
		public bots: Store<string, Bot>;
		public users: Store<string, User>;
		public options: ClientOptions;

		public edit(options?: ClientOptions, preset?: boolean): ClientOptions;
		public fetchAllBots(options?: MultiFetchOptions): Promise<Bot[] | Store<string, Bot>>;
		public fetchBot(id?: string | FetchOptions, options?: FetchOptions): Promise<Bot>;
		public fetchBotsOfUser(id: string, options?: MultiFetchOptions): Promise<Bot[]>;
		public fetchStats(options?: FetchOptions): Promise<Stats>;
		public fetchUser(id: string, options?: FetchOptions): Promise<User>;
		public fetchUpvotes(id?: string, options?: MultiFetchOptions): Promise<Upvote[] | Store<string, Upvote>>
		public postCount(id?: string | PostOptions, options?: PostOptions): object;
		private _cache(): Promise<void>;
		private get(point: string, Authorization: string, version: number, ...headers: string[]): Promise<Response>;
		private fetch(point: string, Authorization: string, version: number, body: object): Promise<Response>;

		public on(event: 'cacheUpdate', listener: (bots: Store<string, Bot>) => void): this;
		public on(event: 'post', listener: (countOrShards: number | number[]) => void): this;
		public once(event: 'cacheUpdate', listener: (bots: Store<string, Bot>) => void): this;
		public once(event: 'post', listener: (countOrShards: number | number[]) => void): this;
		public addListener(event: 'cacheUpdate', listener: (bots: Store<string, Bot>) => void): this;
		public addListener(event: 'post', listener: (countOrShards: number | number[]) => void): this;
		public removeListener(event: 'cacheUpdate', listener: (bots: Store<string, Bot>) => void): this;
		public removeListener(event: 'post', listener: (countOrShards: number | number[]) => void): this;
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
		public id: string;
		public invite: string;
		public inviteNoPerms: string;
		public prefix: string;
		public shortDescription: string;
		public updatedAt: number;
		public username: string;
		public fullDescription?: string;
		public serverCount?: number;
		public supportCode?: string;
		public vanity?: string;

		public readonly tag: string;
		public readonly tags: string[];
		public readonly page: string;
		public readonly views: number[];
		public readonly owner: User;
		public readonly owners: User[];
		public readonly secondaryOwners: User[];
		public readonly shards?: number[];
		public readonly supportURL?: string;
		public readonly vanityURL?: string;

		public toString(): string;
	}

	/** When an error is caught while fetching, this is thrown. */
	export class FetchError extends Error {
		constructor(i: Response);

		public readonly name: 'FetchError';

		public toString(): string;
	}

	/** A 429 Ratelimit Class. */
	export class Ratelimit extends Error {
		constructor(headers: Headers, endpoint: string);

		public readonly headers: Headers;
		public readonly limit: number;
		public readonly retryAfter: number;
		public readonly name: 'Ratelimit';
		public readonly message: string;

		public toString(): string;
	}

	/** Represents the site's statistics information. */
	export class Stats {
		constructor(stats: object);
		private raw: object;

		public totalBots: number;
		public approvedBots: number;
		public unapprovedBots: number;
		public users: number;
		public tags: number;

		public readonly botUserTotal: number;
	}

	/** Represents a user with full information on the site. */
	export class User extends Base {
		constructor(user: object);

		public avatar: string;
		public description: string;
		public discriminator: string;
		public id: string;
		public username: string;

		public readonly page: string;
		public readonly tag: string;

		public toString(): string;
	}

	export class Upvote extends Base {
		constructor(obj: object);

		public user: User;
		public timestamp: number;

		public toString(): string;
	}

	//#endregion

	//#region Options

	export type ClientOptions = {
		autoCache?: boolean;
		autoCacheInterval?: number;
		botID?: string;
		botToken?: string;
		cache?: boolean;
		userToken?: string;
		version?: number;
	}

	export type FetchOptions = {
		cache?: boolean;
		raw?: boolean;
		version?: number;
		botToken?: string;
		userToken?: string;
	}

	export type MultiFetchOptions = FetchOptions & {
		mapify?: boolean;
		page?: number;
	}

	export type PostOptions = {
		botToken?: string;
		countOrShards: number | number[];
		version?: number;
	}

	//#endregion
}
// Type definitions for simple.space v3.2.0
// Project: https://github.com/BLU-Shack/simple.space
// Definitions by:
//   iREDMe <foodrickme@gmail.com> (https://github.com/iREDMe)
// License: MIT

declare module 'simple.space' {
	import Store from '@ired_me/red-store';
	import { Response } from 'node-fetch';
	export const version: string;

	//#region Classes
	/** The Client for interacting with botlist.space */
	export class Client {
		constructor(options?: ClientOptions);

		public bots: Store<string, Bot>;
		public users: Store<string, User>;
		public options: ClientOptions;
		public stats: Stats[];
		public readonly endpoint: string;

		public edit(options?: ClientOptions, preset?: boolean): ClientOptions;
		public fetchAllBots(options?: MultiFetchOptions): Promise<Bot[] | Store<string, Bot>>;
		public fetchBot(id?: string | FetchOptions, options?: FetchOptions): Promise<Bot>;
		public fetchBots(options?: MultiFetchOptions): Promise<Bot[] | Store<string, Bot>>;
		public fetchBotsOfUser(id: string, options?: MultiFetchOptions): Promise<Bot[]>;
		public fetchStats(options?: FetchOptions): Promise<Stats>;
		public fetchUser(id: string, options?: FetchOptions): Promise<User>;
		public fetchUpvotes(id?: string, options?: MultiFetchOptions): Promise<Upvote[] | Store<string, Upvote>>;
		public postCount(id?: string, options?: PostOptions): object;
		public postCount(options?: PostOptions): object;
		public postCount(countOrShards?: number | number[], options?: PostOptions): object;
		private get(point: string, Authorization: string, version: number, headers: object): Promise<Response>;
		private authGet(point: string, Authorization: string, version: number, headers: object): Promise<Response>;
		private fetch(point: string, Authorization: string, version: number, body: object): Promise<Response>;
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

		public readonly createdTimestamp: Date;
		public readonly owner: User;
		public readonly owners: User[];
		public readonly page: string;
		public readonly secondaryOwners: User[];
		public readonly shards?: number[];
		public readonly supportURL?: string;
		public readonly tag: string;
		public readonly tags: string[];
		public readonly vanityURL?: string;
		public readonly views: number[];

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

	/** Represents botlist.space's statistics information. */
	export class Stats {
		constructor(stats: object);
		private raw: object;

		public createdAt: Date;
		public createdTimestamp: number;
		public totalBots: number;
		public approvedBots: number;
		public unapprovedBots: number;
		public users: number;
		public tags: number;

		public readonly createdTimestamp: number;
		public readonly botUserTotal: number;
	}

	/** Represents a User on botlist.space */
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

	/** Represents a User Upvote of a bot. */
	export class Upvote extends Base {
		constructor(obj: object, id: string);

		public id: string;
		public timestamp: number;
		public user: User;

		public toString(): string;
	}

	//#endregion

	//#region Options

	type ClientOptions = {
		botID?: string;
		botToken?: string;
		cache?: boolean;
		version?: number;
		statsLimit?: number;
	}

	type FetchOptions = {
		cache?: boolean;
		raw?: boolean;
		version?: number;
		botToken?: string;
	}

	type MultiFetchOptions = FetchOptions & {
		mapify?: boolean;
		page?: number;
		reverse?: boolean;
		sortBy?: string;
	}

	type PostOptions = {
		botToken?: string;
		countOrShards: number | number[];
		version?: number;
	}
	//#endregion
}
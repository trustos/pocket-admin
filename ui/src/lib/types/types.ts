import type { AuthModel, ListResult, RecordModel } from 'pocketbase';
import type { Collection } from './interfaces';
import type { Column } from 'svelte-headless-table';

export type ListResultCollection = ListResult<Collection>;

export type SchemaFiledType =
	| 'id'
	| 'text'
	| 'editor'
	| 'file'
	| 'number'
	| 'bool'
	| 'email'
	| 'url'
	| 'date'
	| 'select'
	| 'relation'
	| 'password'
	| 'json';

export type SchemaField = {
	name: string;
	type: SchemaFiledType;
	options?: {
		min?: number | string | null;
		max?: number | string | null;
		maxSelect?: number;
		maxSize?: number;
		protected?: boolean;
		mimeTypes?: string[];
		thumbs?: string[];
		convertUrls?: boolean;
		noDecimal?: boolean;
		values?: string[];
		cascadeDelete?: boolean;
		collectionId?: string;
		displayFields?: string[] | null;
	};
	required?: boolean;
	system?: boolean;
	unique?: boolean;
	presentable?: boolean;
	label?: string;
};

export type CollectionSchema = SchemaField[];

export type User = AuthModel & {
	paRole: string;
	// You can add additional properties here if needed
};

export type SideNavItem = {
	href: string;
	title: string;
	icon: unknown;
};

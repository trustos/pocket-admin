import type { ListResult } from 'pocketbase';
import type { Collection } from './interfaces';

export type ListResultCollection = ListResult<Collection>;

export type SchemaFiledType =
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
	| 'json';

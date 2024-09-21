import type { ListResult, RecordModel } from 'pocketbase';
import type { Collection } from './interfaces';
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
	| 'json';

export type SchemaField = {
	name: string;
	type: SchemaFiledType;
};

export type CollectionSchema = Partial<RecordModel>;

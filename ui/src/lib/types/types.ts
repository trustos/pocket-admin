import type { ListResult, RecordModel } from 'pocketbase';
import type { Collection } from './interfaces';
import type { TableColumnDef } from 'svelte-headless-table';
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

export type ColProps<TData, TValue = any> = TableColumnDef<TData, TValue> & {
	accessor: keyof TData | ((row: TData) => TValue);
	header: string;
	cell?: ({ value: any }) => any;
	plugins: {
		sort: {
			disable: boolean;
		};
	};
};

// export type ColProps = {
// 	accessor: string | (({ id }: { id: any }) => any);
// 	header: string;
// 	cell?: ({ value: any }) => any;
// 	plugins: {
// 		sort: {
// 			disable: boolean;
// 		};
// 	};
// };

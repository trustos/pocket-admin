import type { PageLoad } from './$types';
import type { Collection, ListResultCollection, CollectionSchema } from '$lib/types';

import pb from '$lib/pocketbase';
import type { RecordModel } from 'pocketbase';
export const prerender = false;

export const load: PageLoad = async ({ params, fetch, parent }) => {
	const { collections } = await parent();

	const collectionWithSchema = collections.find((c) => c.name === params.collectionName);

	const findRelationFields =
		(collectionWithSchema?.schema as Partial<RecordModel>[])
			?.filter((c: Partial<RecordModel>) => c.type === 'relation')
			.map((c: Partial<RecordModel>) => c.name) || [];

	const collection: ListResultCollection = await pb
		.collection(params.collectionName)
		.getList<Collection>(1, 20, { fetch, expand: findRelationFields.join(',') });

	const schema: CollectionSchema = [
		{ name: 'id', type: 'id' },
		...(collectionWithSchema?.schema || []),
		{ name: 'created', type: 'date' },
		{ name: 'updated', type: 'date' }
	];

	return {
		collection,
		schema,
		title: collectionWithSchema?.name
	};
};

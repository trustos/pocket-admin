import type { PageLoad } from './$types';
import type { Collection, ListResultCollection } from '$lib/types';

import pb from '$lib/pocketbase';
export const prerender = false;

export const load: PageLoad = async ({ params, fetch, parent }) => {
	const { collections } = await parent();

	const collectionWithSchema = collections.find((c) => c.id === params.id);

	const findRelationFields =
		collectionWithSchema?.schema.filter((c) => c.type === 'relation').map((c) => c.name) || [];

	const collection: ListResultCollection = await pb
		.collection(params.id)
		.getList<Collection>(1, 20, { fetch, expand: findRelationFields.join(',') });

	console.log(collection);

	const schema = [
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

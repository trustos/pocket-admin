import type { PageLoad } from './$types';
import type { Collection, ListResultCollection } from '$lib/types';

import pb from '$lib/pocketbase';
export const prerender = false;

export const load: PageLoad = async ({ params, fetch, parent }) => {
	const collection: ListResultCollection = await pb
		.collection(params.id)
		.getList<Collection>(1, 20, { fetch });

	const { collections } = await parent();

	const collectionWithSchema = collections.find((c) => c.id === params.id);

	if (collectionWithSchema) console.log(collectionWithSchema.schema);

	return {
		collection,
		schema: collectionWithSchema?.schema || [],
		title: collectionWithSchema?.name
	};
};

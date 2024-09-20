import type { PageLoad } from './$types';
import pb from '$lib/pocketbase';

export const load: PageLoad = async ({ params, parent, fetch }) => {
	const { collections } = await parent();

	const collection = collections.find((c) => c.name === params.collectionName);

	const record = await pb.collection(params.collectionName).getOne(params.recordId, { fetch });

	return {
		record,
		schema: collection?.schema
	};
};

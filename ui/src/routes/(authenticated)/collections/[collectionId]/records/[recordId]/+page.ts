import type { PageLoad } from './$types';
import pb from '$lib/pocketbase';

export const load: PageLoad = async ({ params, fetch }) => {
	// console.log('url', url);
	// console.log('params', params);
	// console.log('parent', parentCollection);

	const record = await pb.collection(params.collectionId).getOne(params.recordId, { fetch });

	return {
		record
	};
};

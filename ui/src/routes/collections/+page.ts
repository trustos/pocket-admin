import pb from '$lib/pocketbase';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const collections = await pb.collection('admin_collections').getFullList({ fetch });

	if (!collections || !collections.length) {
		return {
			collections: []
		};
	}

	const updatedCollections = await Promise.all(
		collections.map(async (collection) => {
			let recordsCount = 0;

			try {
				recordsCount = (await pb.collection(collection.name).getList(1, 1, { fetch })).totalItems;
			} catch (e) {
				console.log('error', e);
			}

			return { ...collection, recordsCount };
		})
	);

	return {
		collections: updatedCollections || []
	};
};

import pb from '$lib/pocketbase';
import type { LayoutLoad } from './$types';

import type { Collections } from '$lib/types';

export const load: LayoutLoad = async ({ fetch }) => {
	const collections = await pb.collection('admin_collections').getFullList<Collections>({ fetch });

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

			// Add records count to collection
			collection.recordsCount = recordsCount;

			return collection;
		})
	);

	return {
		collections: updatedCollections || []
	};
};

export const prerender = false;

import pb from '$lib/pocketbase';
import type { LayoutLoad } from './$types';

import type { Collections } from '$lib/types';

export const load: LayoutLoad = async ({ fetch }) => {
	const allCollections = await pb
		.collection('admin_collections')
		.getFullList<Collections>({ fetch });

	// Filter out base collections
	const collections = allCollections.filter((c) => c.type === 'base');
	const adminCollection = allCollections.find(
		(c) => c.type === 'view' && c.name === 'admin_collections'
	);

	if (!allCollections || !allCollections.length) {
		return {
			collections: [],
			schema: []
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
		collections: updatedCollections || [],
		schema: [...(adminCollection?.schema || []), { name: 'recordsCount' }]
	};
};

export const prerender = false;

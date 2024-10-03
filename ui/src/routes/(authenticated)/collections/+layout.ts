import pb from '$lib/pocketbase';
import type { LayoutLoad } from './$types';

import type { Collection, CollectionSchema, ListResultCollection } from '$lib/types';

export const load: LayoutLoad = async ({ fetch }) => {
	const collections = await pb
		.collection('admin_collections')
		.getList<Collection>(1, 500, { fetch, sort: 'name', filter: pb.filter(`type = 'base'`) });

	// Filter out non-base collections
	collections.items.filter((c) => c.type === 'base');

	console.log(pb.isPocketAdmin);
	console.log(pb.pocketAdminRole);

	console.log(collections);

	if (pb.isPocketAdmin) {
		const users: ListResultCollection = await pb
			.collection('users')
			.getList(1, 500, { fetch, expand: 'role' });

		if (users && users.items) {
			const usersCollection = users.items[0];
			usersCollection.name = 'users';
			usersCollection.type = 'auth';

			collections.items = [...collections.items, ...(users.items as Collection[])];
		}
	}

	if (!collections || !collections.items.length) {
		return {
			collections: [],
			schema: []
		};
	}

	const schema: CollectionSchema = [...(collections.items[0]?.schema || [])];

	return {
		// Filter out non-base collections
		collections: collections.items,
		schema
	};
};

export const prerender = false;

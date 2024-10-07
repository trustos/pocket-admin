import { auth } from '$lib/stores';
import type { LayoutLoad } from './$types';
import type { Collection, CollectionSchema, ListResultCollection } from '$lib/types';

export const load: LayoutLoad = async ({ fetch }) => {
	const collections = await auth.pb
		.collection('admin_collections')
		.getList<Collection>(1, 500, { fetch, sort: 'name', filter: 'type = "base"' });

	// Filter out non-base collections
	collections.items = collections.items.filter((c: Collection) => c.type === 'base');

	if (auth.isPocketAdmin) {
		const users: ListResultCollection = await auth.pb
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
		collections: collections.items,
		schema
	};
};

export const prerender = false;

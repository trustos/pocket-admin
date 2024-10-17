import { auth } from '$lib/stores';
import type { LayoutLoad } from './$types';
import type { Collection, CollectionSchema, ListResultCollection } from '$lib/types';

export const load: LayoutLoad = async ({ fetch }) => {
	const collections = await auth.pb
		.collection('admin_collections')
		.getList<Collection>(1, 500, { fetch, sort: 'name', filter: 'type = "base" || type = "auth"' });

	if (!auth.isPocketAdmin) {
		// Filter out base collections
		collections.items = collections.items.filter((c: Collection) => c.type === 'base');
		// Filter out the admin_roles collection
		collections.items = collections.items.filter((c: Collection) => c.name !== 'admin_roles');
	}

	if (!collections || !collections.items.length) {
		return {
			collections: [],
			schema: []
		};
	}

	const schema: CollectionSchema = [...(collections.items[0]?.schema || [])];

	console.log(collections);

	return {
		collections: collections.items,
		schema
	};
};

export const prerender = false;

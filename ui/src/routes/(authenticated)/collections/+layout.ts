import { auth } from '$lib/stores';
import type { LayoutLoad } from './$types';
import type { Collection, CollectionSchema, ListResultCollection } from '$lib/types';

type AuthCollectionSchema = {
	password: string;
} & CollectionSchema;

export const load: LayoutLoad = async ({ fetch }) => {
	const collections = await auth.pb
		.collection('admin_collections')
		.getList<Collection>(1, 500, { fetch, sort: 'name', filter: 'type = "base" || type = "auth"' });

	let filteredCollections = collections.items;

	if (!auth.isPocketAdmin) {
		// Filter out base collections and admin_roles collection
		filteredCollections = filteredCollections.filter(
			(c: Collection) => c.type === 'base' && c.name !== 'admin_roles'
		);
	}

	// Sort collections: auth first, then base
	filteredCollections.sort((a, b) => {
		if (a.type === 'auth' && b.type !== 'auth') return -1;
		if (a.type !== 'auth' && b.type === 'auth') return 1;
		return a.name.localeCompare(b.name);
	});

	if (!filteredCollections.length) {
		return {
			collections: [],
			schema: []
		};
	}

	const schema: CollectionSchema = [...(filteredCollections[0]?.schema || [])];

	return {
		collections: filteredCollections,
		schema
	};
};

export const prerender = false;

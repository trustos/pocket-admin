import type { PageLoad } from './$types';
import type { Collection, ListResultCollection, CollectionSchema } from '$lib/types';

import { auth } from '$lib/stores';
import type { ClientResponseError, RecordModel } from 'pocketbase';
export const prerender = false;

export const load: PageLoad = async ({ params, fetch, parent, url }) => {
	const { collections } = await parent();

	const collectionWithSchema = collections.find((c) => c.name === params.collectionName);

	const page = Number(url.searchParams.get('page')) || 1;
	const perPage = 10;

	const findRelationFields =
		(collectionWithSchema?.schema as Partial<RecordModel>[])
			?.filter((c: Partial<RecordModel>) => c.type === 'relation')
			.map((c: Partial<RecordModel>) => c.name) || [];

	const relationsToExpand = findRelationFields.join(',');
	try {
		const collection: ListResultCollection = await auth.pb
			.collection(params.collectionName)
			.getList<Collection>(page, perPage, {
				fetch,
				expand: relationsToExpand,
				sort: '-created'
			});

		if (collectionWithSchema?.schema && collectionWithSchema?.type === 'auth') {
			if (!collectionWithSchema?.schema.find((field) => field.name === 'email')) {
				collectionWithSchema.schema.push({ name: 'email', type: 'email' });
			}

			if (!collectionWithSchema?.schema.find((field) => field.name === 'verified')) {
				collectionWithSchema.schema.push({ name: 'verified', type: 'bool' });
			}
		}

		const schema: CollectionSchema = [
			{ name: 'id', type: 'id' },
			...(collectionWithSchema?.schema || []),
			{ name: 'created', type: 'date' },
			{ name: 'updated', type: 'date' }
		];

		return {
			collection,
			schema,
			title: collectionWithSchema?.name,
			relationsToExpand,
			pagination: {
				page,
				perPage,
				totalPages: Math.ceil(collection.totalItems / perPage),
				totalItems: collection.totalItems
			}
		};
	} catch (e) {
		return {
			error: e as ClientResponseError
		};
	}
};

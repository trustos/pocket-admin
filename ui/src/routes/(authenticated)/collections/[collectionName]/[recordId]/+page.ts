import type { PageLoad } from './$types';
import { auth } from '$lib/stores';
import type { RecordModel } from 'pocketbase';
import type { CollectionSchema } from '$lib/types';

export const load: PageLoad = async ({ params, parent, fetch }) => {
	const { collections } = await parent();

	const collection = collections.find((c) => c.name === params.collectionName);

	const findRelationFields =
		(collection?.schema as Partial<RecordModel>[])
			?.filter((c: Partial<RecordModel>) => c.type === 'relation')
			.map((c: Partial<RecordModel>) => c.name) || [];

	let record: RecordModel | undefined;

	// Fetch record if not new
	if (params.recordId !== 'newRecord') {
		record = await auth.pb
			.collection(params.collectionName)
			.getOne(params.recordId, { fetch, expand: findRelationFields.join(',') });
	}

	return {
		record,
		collectionType: collection?.type,
		schema: [...(collection?.schema || [])]
	};
};

import type { PageLoad } from './$types';
import { auth } from '$lib/stores';
import type { RecordModel } from 'pocketbase';

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

	// Add password field to auth collection
	if (collection?.type === 'auth') {
		// Add password field to auth collection
		if (!record) {
			// collection?.schema.push({ name: 'email', type: 'email' });
			collection?.schema.push({ name: 'password', type: 'text' });
			collection?.schema.push({ name: 'passwordConfirm', type: 'text' });
			// collection?.schema.push({ name: 'verified', type: 'bool' });
		}
	}

	return {
		record,
		schema: collection?.schema || []
	};
};

import type { PageLoad } from './$types';
// import PocketBase from 'pocketbase';
import pb from '$lib/pocketbase';
//
export const prerender = false;

export const load: PageLoad = async ({ params, fetch }) => {
	const collection = await pb.collection(params.id).getFullList({ fetch });

	return {
		collection: collection
	};
};

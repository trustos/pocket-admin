import type { PageLoad } from './$types';
// import PocketBase from 'pocketbase';
import pb from '$lib/pocketbase';
//
export const prerender = false;

export const load: PageLoad = async ({ params }) => {
	// console.log(locals);

	// console.log(await all.parent());
	// const pb = new PocketBase('http://127.0.0.1:8090');

	const collection = await pb.collection(params.id).getFullList();

	return {
		collection: collection
	};
};

import type { LayoutLoad } from './$types';
import PocketBase from 'pocketbase';

export const load: LayoutLoad = async ({ fetch, params }) => {
	const pb = new PocketBase('http://127.0.0.1:8090');
	// console.log(params.slug);
	return {
		collections: await pb.collection('admin_collections').getFullList({ fetch })
	};
};

export const prerender = true;
// export const csr = true;
export const ssr = false;
export const trailingSlash = 'always';

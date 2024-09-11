import type { Handle } from '@sveltejs/kit';
import pb from '$lib/pocketbase';

// export const handle: Handle = async ({ event, resolve }) => {
// 	// console.log(pb);
// 	// console.log(event);

// 	const response = await resolve(event);
// 	return response;
// };

export const handle = async ({ event, resolve }) => {
	console.log('calledTheHook');

	try {
		// get an up-to-date auth store state by verifying and refreshing the loaded auth model (if any)
		//

		if (pb.authStore.isValid) {
			console.log(pb.authStore.isAdmin);
			await pb.collection('users').authRefresh();
		}

		// pb.authStore.isValid && (await pb.collection('users').authRefresh());
	} catch {
		// clear the auth store on failed refresh
		pb.authStore.clear();
	}

	const response = await resolve(event);

	return response;
};

// export const authorization: Handle = async ({ event, resolve }) => {
// 	// If the request is still here, just proceed as normally
// 	const result = await resolve(event);
// 	return result;
// };

// export const handle = sequence(authentication, authorization);

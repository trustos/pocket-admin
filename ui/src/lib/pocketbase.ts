import PocketBase from 'pocketbase';

import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
import { user } from '$lib/stores';

class LocalPocketBase extends PocketBase {
	constructor() {
		super(PUBLIC_POCKETBASE_URL);
	}

	logout = () => {
		// await this.collections('auth').delete(this.authStore.get('id')
		this.authStore.clear();
		user.set(null);
	};
}

const pb = new LocalPocketBase();

export default pb;
// Ensure that the auth store is loaded from localStorage on app start
// pb.authStore.load

// Optionally, listen for auth changes to save back to localStorage
// pb.authStore.onChange(() => {
//   pb.authStore.save();
// });

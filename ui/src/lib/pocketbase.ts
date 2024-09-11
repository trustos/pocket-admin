import PocketBase from 'pocketbase';
import { PUBLIC_POCKETBASE_URL } from '$env/static/public';

const pb = new PocketBase(PUBLIC_POCKETBASE_URL);

export default pb;
// Ensure that the auth store is loaded from localStorage on app start
// pb.authStore.load

// Optionally, listen for auth changes to save back to localStorage
// pb.authStore.onChange(() => {
//   pb.authStore.save();
// });

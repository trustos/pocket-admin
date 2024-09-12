import { writable } from 'svelte/store';

import { type AuthModel } from 'pocketbase';

const user = writable<AuthModel>(null);

export default user;

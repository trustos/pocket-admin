import PocketBase from 'pocketbase';
import { writable } from 'svelte/store';
import { goto } from '$app/navigation';
import { base } from '$app/paths';
import { APP_URL } from '$lib/types/constants';
import type { User } from '$lib/types';

function createAuthStore() {
	const pb = new PocketBase();
	const { subscribe, set } = writable<User | null>(null);

	return {
		subscribe,
		pb, // Expose PocketBase instance for direct access if needed
		get isPocketAdmin() {
			const role = pb.authStore.model?.expand?.['role']?.name;
			return (role && role === 'admin') || false;
		},
		get pocketAdminRole() {
			const role = pb.authStore.model?.expand?.['role']?.name;
			return role || null;
		},
		login: async (email: string, password: string) => {
			try {
				const authData = await pb
					.collection('users')
					.authWithPassword(email, password, { expand: 'role' });
				const user = {
					...authData.record,
					paRole: pb.authStore.model?.expand?.['role']?.name || null
				};
				set(user);
				goto(base);
				return { success: true };
			} catch (error) {
				console.error('Login failed:', error);
				return { success: false, error };
			}
		},
		logout: () => {
			pb.authStore.clear();
			set(null);
			goto(APP_URL.login);
		},
		refresh: async (customFetch?: typeof fetch) => {
			if (pb.authStore.isValid) {
				try {
					const authData = await pb.collection('users').authRefresh({
						expand: 'role',
						...(customFetch ? { fetch: customFetch } : {})
					});
					const user = {
						...authData.record,
						paRole: pb.authStore.model?.expand?.['role']?.name || null
					};
					set(user);
				} catch (error) {
					console.error('Auth refresh failed:', error);
					pb.authStore.clear();
					set(null);
				}
			}
		},
		initialize: () => {
			if (pb.authStore.isValid) {
				set({ ...pb.authStore.model, paRole: pb.authStore.model?.expand?.['role']?.name || null });
			}
		},
		isValid: () => pb.authStore.isValid
	};
}

export const auth = createAuthStore();

import type { LayoutLoad } from './$types';
import { type Menu } from '$lib/types';
import House from 'lucide-svelte/icons/house';
import Settings from 'lucide-svelte/icons/settings';
import Database from 'lucide-svelte/icons/database';
import pb from '$lib/pocketbase';
import { redirect } from '@sveltejs/kit';
import { APP_URL } from '$lib/types/constants';
import { removeTrailingSlash } from '$lib/helpers';
import { base } from '$app/paths';
import { user } from '$lib/stores';
import { ErrorToast } from '$lib/components/toast';
import type { ClientResponseError } from 'pocketbase';

export const load: LayoutLoad = async ({ url, route, fetch }) => {
	const currentPath = removeTrailingSlash(url.pathname);

	//Check if the route is existing i.e. not a 404 page
	if (route.id) {
		// Refresh the user token if it is valid
		if (pb.authStore.isValid) {
			try {
				await pb.collection('users').authRefresh({ fetch, expand: 'role' });
			} catch (error) {
				// If the token is invalid, logout the user and redirect to the login page
				console.log('error', error as ClientResponseError);
				ErrorToast((error as ClientResponseError).message);
				pb.logout();
				throw redirect(302, APP_URL.login);
			}
		}

		// Redirect to the home page if is authenticated and on login page
		if (pb.authStore.isValid && currentPath === APP_URL.login) {
			user.set(pb.authStore.model);
			throw redirect(302, base);
		}
		// Redirect to the login page if not authenticated
		if (!pb.authStore.isValid && currentPath !== APP_URL.login) {
			throw redirect(302, APP_URL.login);
		}
	}

	const menu: Menu[] = [
		{
			name: 'Dashboard',
			href: '/',
			position: 'top',
			icon: House
		},
		{
			name: 'Collections',
			href: '/collections',
			position: 'top',
			icon: Database
		},
		{
			name: 'Settings',
			href: '/settings',
			position: 'bottom',
			icon: Settings
		}
	];

	return {
		menu
	};
};

export const prerender = true;
export const ssr = false;
export const trailingSlash = 'always';

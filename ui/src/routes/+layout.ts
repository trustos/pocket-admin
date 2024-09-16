import type { LayoutLoad } from './$types';
import { type Menu } from '$lib/types';
import House from 'lucide-svelte/icons/house';
import Settings from 'lucide-svelte/icons/settings';
import Database from 'lucide-svelte/icons/database';
import pb from '$lib/pocketbase';
import { redirect } from '@sveltejs/kit';
import { APP_URL } from '$lib/types/constants';
import { removeTrailingSlash } from '$lib/helpers';

export const load: LayoutLoad = async ({ url, route, fetch }) => {
	const currentPath = removeTrailingSlash(url.pathname);

	//Check if the route is existing i.e. not a 404 page
	if (route.id) {
		// Refresh the user token if it is valid
		if (pb.authStore.isValid) {
			await pb.collection('users').authRefresh({ fetch });
		}

		// Redirect to the home page if is authenticated and on login page
		if (pb.authStore.isValid && currentPath === APP_URL.login) {
			throw redirect(302, '/');
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

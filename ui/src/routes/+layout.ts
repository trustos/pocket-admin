import { type Menu } from '$lib/types';
import House from 'lucide-svelte/icons/house';
import Settings from 'lucide-svelte/icons/settings';
import Database from 'lucide-svelte/icons/database';

import type { LayoutLoad } from './$types';
import { auth } from '$lib/stores';
import { redirect } from '@sveltejs/kit';
import { APP_URL } from '$lib/types/constants';
import { removeTrailingSlash } from '$lib/helpers';
import { base } from '$app/paths';

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

export const load: LayoutLoad = async ({ url, route, fetch }) => {
	const currentPath = removeTrailingSlash(url.pathname);

	if (route.id) {
		if (auth.isValid()) {
			await auth.refresh(fetch);
		}

		if (auth.isValid() && currentPath === APP_URL.login) {
			throw redirect(302, base);
		}

		if (!auth.isValid() && currentPath !== APP_URL.login) {
			throw redirect(302, APP_URL.login);
		}
	}

	return { menu };
};

export const prerender = true;
export const ssr = false;
export const trailingSlash = 'always';

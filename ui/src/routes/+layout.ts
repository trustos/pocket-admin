import type { LayoutLoad } from './$types';
import { type Menu } from '$lib/types';
import House from 'lucide-svelte/icons/house';
import Settings from 'lucide-svelte/icons/settings';
import CircleUser from 'lucide-svelte/icons/circle-user';
import Database from 'lucide-svelte/icons/database';

export const load: LayoutLoad = () => {
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
			name: 'Profile',
			href: '/account/login',
			position: 'top',
			icon: CircleUser
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
// export const csr = true;
export const ssr = false;
export const trailingSlash = 'always';

import type { LayoutLoad } from './$types';
import PocketBase from 'pocketbase';
import { type Menu } from '$lib/types';
import House from 'lucide-svelte/icons/house';
import Settings from 'lucide-svelte/icons/settings';
import CircleUser from 'lucide-svelte/icons/circle-user';
// <CircleUser />

export const load: LayoutLoad = async ({ fetch }) => {
	const menu: Menu[] = [
		{
			name: 'Dashboard',
			href: '/',
			position: 'top',
			icon: House
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

	const pb = new PocketBase('http://127.0.0.1:8090');
	// console.log(params.slug);
	//
	//
	//
	return {
		menu,
		collections: (await pb.collection('admin_collections').getFullList({ fetch })) || []
	};
};

export const prerender = true;
// export const csr = true;
export const ssr = false;
export const trailingSlash = 'always';

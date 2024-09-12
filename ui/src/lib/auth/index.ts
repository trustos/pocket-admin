import { onMount } from 'svelte';
import { beforeNavigate, goto } from '$app/navigation';

import pb from '$lib/pocketbase';
import { APP_URL } from '$lib/types/constants';

// Function to handle authentication on page load and navigation
export function protectRoute() {
	// Check authentication when the component mounts (initial load)
	onMount(() => {
		const user = pb.authStore.model;
		if (!user && window.location.pathname !== APP_URL.login) {
			goto(APP_URL.login); // Redirect to login if not authenticated
		}
	});

	// Check authentication before navigating to a new page
	beforeNavigate((nav) => {
		console.log(nav);
		// console.log($page.url);
		const user = pb.authStore.model;
		if (!user && nav.to && nav.to.url.pathname !== APP_URL.login) {
			goto(APP_URL.login); // Redirect to login if not authenticated
		}
	});
}

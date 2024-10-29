<script lang="ts">
	import { SideNav } from '$lib/components/nav';
	import type { SideNavItem } from '$lib/types';
	import { Earth } from 'lucide-svelte';
	import { Webhook } from 'lucide-svelte';

	// import SquareLibrary from 'lucide-svelte/icons/square-library';
	// import Users from 'lucide-svelte/icons/users';

	const settingsItems: SideNavItem[] = [
		{ title: 'General', href: '/settings/general', icon: Earth },
		{ title: 'Webhooks', href: '/settings/webhooks', icon: Webhook }
	];
</script>

<div class="flex h-full flex-col lg:flex-row">
	<aside class="w-full lg:w-52">
		<div class="sticky top-0 overflow-y-auto p-4">
			<SideNav items={settingsItems} />
		</div>
	</aside>

	<div class="flex-1 overflow-y-auto p-4">
		<slot></slot>
	</div>
</div>

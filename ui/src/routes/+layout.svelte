<script lang="ts">
	import '../app.css';
	import type { LayoutData } from './$types';
	import { setContext } from 'svelte';
	import { user } from '$lib/stores';
	import pb from '$lib/pocketbase';

	import { Breadcrumbs } from '$lib/components/breadcrumbs';
	import { Nav, NavMobile } from '$lib/components/nav';
	import { Account } from '$lib/components/account';
	import { Toaster } from '$lib/shadcn/components/ui/sonner';
	import { ModeWatcher } from 'mode-watcher';

	export let data: LayoutData;

	$: if (pb.authStore.isValid) {
		user.set(pb.authStore.model);
		setContext('user', pb.authStore.model);
	} else {
		user.set(null);
		pb.authStore.clear();
	}
</script>

<div class="flex min-h-screen w-full flex-col bg-card" data-vaul-drawer-wrapper>
	{#if $user}
		<aside class="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
			<Nav menu={data.menu} />
		</aside>
		<div class="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
			<header
				class="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6"
			>
				<NavMobile menu={data.menu} />
				<Breadcrumbs />

				<div class="relative ml-auto flex-1 md:grow-0">
					<Account />
				</div>
			</header>

			<slot></slot>
		</div>
	{:else}
		<slot></slot>
	{/if}
</div>

<Toaster
	theme="light"
	position="top-center"
	translate="yes"
	toastOptions={{
		duration: 3000
	}}
/>
<ModeWatcher track={true} defaultMode="system" />

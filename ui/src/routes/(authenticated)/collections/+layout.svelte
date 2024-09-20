<script lang="ts">
	import type { LayoutData } from './$types';
	import { SideNav } from '$lib/components/nav';
	import SquareLibrary from 'lucide-svelte/icons/square-library';
	import { onNavigate } from '$app/navigation';
	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});

	export let data: LayoutData;
	const { collections } = data;

	const collectionItems = collections.map((collection) => {
		return {
			title: collection.name,
			href: `/collections/${collection.name}`,
			icon: collection.type == 'base' ? SquareLibrary : ''
		};
	});
</script>

<main
	class="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-12 xl:grid-cols-12"
>
	<div class="col-span-2">
		<SideNav items={collectionItems} />
	</div>

	<div class="col-span-10 overflow-auto">
		<slot></slot>
	</div>
</main>

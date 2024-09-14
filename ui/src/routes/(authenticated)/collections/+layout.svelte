<script lang="ts">
	import type { PageData } from './$types';
	import { SideNav } from '$lib/components/nav';
	// import { Library, LibraryBig } from 'lucide-svelte/icons';
	import Library from 'lucide-svelte/icons/library';
	import SquareLibrary from 'lucide-svelte/icons/square-library';
	// <SquareLibrary />

	export let data: PageData;
	const { collections } = data;

	const collectionItems = collections.map((collection) => {
		return {
			title: collection.name,
			href: `/collections/${collection.id}`,
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

	<div class="col-span-10">
		<slot></slot>
	</div>
</main>

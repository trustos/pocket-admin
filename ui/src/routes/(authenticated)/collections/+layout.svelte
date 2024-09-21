<script lang="ts">
	import type { LayoutData } from './$types';
	import { SideNav } from '$lib/components/nav';
	import SquareLibrary from 'lucide-svelte/icons/square-library';
	import { onNavigate } from '$app/navigation';

	// Define a type for the document with the optional startViewTransition method
	type DocumentWithViewTransition = Document & {
		startViewTransition?: (callback: () => Promise<void> | void) => {
			finished: Promise<void>;
			ready: Promise<void>;
			updateCallbackDone: Promise<void>;
		};
	};

	onNavigate((navigation) => {
		const doc = document as DocumentWithViewTransition;
		const startViewTransition = doc.startViewTransition;

		if (typeof startViewTransition !== 'function') return;

		return new Promise((resolve) => {
			startViewTransition.call(doc, async () => {
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

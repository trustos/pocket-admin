<script lang="ts">
	import type { LayoutData } from './$types';
	import { SideNav } from '$lib/components/nav';
	import SquareLibrary from 'lucide-svelte/icons/square-library';
	import Users from 'lucide-svelte/icons/users';
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

	const collectionIcon = (type: string) => {
		console.log(type);
		if (type == 'base') return SquareLibrary;
		if (type == 'auth') return Users;

		return '';
	};

	const collectionItems = collections.map((collection) => {
		return {
			title: collection.name,
			href: `/collections/${collection.name}`,
			icon: collectionIcon(collection.type)
		};
	});
</script>

<div class="flex h-full flex-col lg:flex-row">
	<aside class="w-full lg:w-52">
		<div class="sticky top-0 overflow-y-auto p-4">
			<SideNav items={collectionItems} />
		</div>
	</aside>

	<div class="flex-1 overflow-y-auto p-4">
		<slot></slot>
	</div>
</div>

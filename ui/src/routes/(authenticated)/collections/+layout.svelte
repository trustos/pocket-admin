<script lang="ts">
	import type { PageData } from './$types';
	import { Table } from '$lib/components/table';
	import { SideNav } from '$lib/components/nav';

	export let data: PageData;
	const { collections } = data;

	console.log(collections);

	const collectionItems = collections.map((collection) => {
		return {
			title: collection.name,
			href: `/admin/collections/${collection.id}`
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

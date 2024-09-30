<script lang="ts">
	import { goto } from '$app/navigation';
	import { DataTable } from '$lib/components/table';
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import type { Collection } from '$lib/types';

	export let data: PageData;

	const { collections, schema } = data;

	const rowClickCallback = (event: Event, row: Collection) => {
		const isCellContent =
			(event.target as HTMLElement)!.nodeName !== 'TD' ||
			!(event.target as HTMLElement)!.closest('td')?.contains(event.target as HTMLElement);

		if (!isCellContent) {
			goto(`${$page.url.pathname}${row.name}`);
		}
	};
</script>

<DataTable
	data={collections}
	filterPlaceholder="Filter collections"
	{schema}
	showHeaderIcons={false}
	title="Collections"
	description="All available collections"
	{rowClickCallback}
	listCollection={true}
/>

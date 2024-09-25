<script lang="ts">
	import type { PageData } from './$types';
	import { DataTable } from '$lib/components/table';
	import type { Collection } from '$lib/types';
	import RecordPage from './[recordId]/+page.svelte';
	import { pushState, preloadData, goto } from '$app/navigation';
	import { page } from '$app/stores';
	import * as Drawer from '$lib/shadcn/components/ui/drawer';
	import { writable } from 'svelte/store';

	export let data: PageData;

	$: ({ collection, schema, title } = data);
	$: items = collection.items;

	const onRecordRowClick = async (event: Event, row: Collection) => {
		const isCellContent =
			(event.target as HTMLElement)!.nodeName !== 'TD' ||
			!(event.target as HTMLElement)!.closest('td')?.contains(event.target as HTMLElement);

		//If the click was on a checkbox, don't do anything
		if (isCellContent) {
			event.preventDefault();
			event.stopPropagation();
			return;
		}

		const recordHref = `${$page.url.pathname}${row.id}`;

		//Prelaod the data for the record page
		const result = await preloadData(recordHref);

		if (result.type === 'loaded' && result.status === 200) {
			//Remove unserilizable data from the result
			delete result.data?.menu;

			pushState(recordHref, { recordPageData: result.data });
		} else {
			// something bad happened! try navigating
			goto(recordHref);
		}
	};

	$: pageDataAvailable = !!$page.state.recordPageData;

	const onRecordClose = () => {
		if (pageDataAvailable) {
			setTimeout(() => {
				history.back();
			}, 200);
		}
	};
</script>

{#key schema}
	<DataTable {title} {schema} data={items} rowClickCallback={onRecordRowClick} />

	<!-- {#if pageDataAvailable} -->
	<Drawer.Root
		shouldScaleBackground
		open={pageDataAvailable}
		onClose={onRecordClose}
		backgroundColor={'black'}
	>
		<Drawer.Content>
			<Drawer.Header>
				<Drawer.Title class="font-normal"
					>Editing <span class="font-bold">{title}</span> record</Drawer.Title
				>
				<Drawer.Description>This action cannot be undone.</Drawer.Description>
				<RecordPage
					destroyCallback={onRecordClose}
					class="mt-5 max-h-[75vh] pt-5"
					data={{ ...JSON.parse(JSON.stringify($page.state.recordPageData)) }}
				/>
			</Drawer.Header>
		</Drawer.Content>
	</Drawer.Root>
	<!-- {/if} -->
{/key}

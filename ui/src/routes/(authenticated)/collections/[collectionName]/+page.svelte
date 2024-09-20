<script lang="ts">
	import type { PageData } from './$types';
	import { DataTable } from '$lib/components/table';
	import type { Collection } from '$lib/types';
	import RecordPage from './[recordId]/+page.svelte';
	import { pushState, preloadData, goto } from '$app/navigation';
	import { page } from '$app/stores';
	import * as Drawer from '$lib/shadcn/components/ui/drawer';
	import { Button } from '$lib/shadcn/components/ui/button';
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

	// const openStateChanged = (isOpen: boolean) => {
	// 	console.log(isOpen);
	// 	// if (!isOpen && $page.state.recordPageData) history.back();
	// };
	//
	let isOpen = true;

	// setTimeout(() => {
	// 	isOpen = false;
	// }, 5000);
	//
	const onRecordClose = () => {
		setTimeout(() => {
			history.back();
		}, 300);
	};
</script>

{#key schema}
	<DataTable {title} {schema} data={items} rowClickCallback={onRecordRowClick} />

	{#if $page.state.recordPageData}
		<Drawer.Root
			shouldScaleBackground
			open={true}
			onClose={onRecordClose}
			backgroundColor={'black'}
		>
			<Drawer.Content>
				<Drawer.Header>
					<Drawer.Title class="font-normal"
						>Editing <span class="font-bold">{title}</span> record</Drawer.Title
					>
					<Drawer.Description>This action cannot be undone.</Drawer.Description>
					<RecordPage data={$page.state.recordPageData} />
				</Drawer.Header>
				<!-- <Drawer.Footer>
					<Button>Save</Button>
					<Drawer.Close>Close</Drawer.Close>
				</Drawer.Footer> -->
			</Drawer.Content>
		</Drawer.Root>
	{/if}
{/key}

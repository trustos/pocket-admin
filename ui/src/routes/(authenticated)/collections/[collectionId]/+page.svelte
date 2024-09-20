<script lang="ts">
	import type { PageData } from './$types';
	import { DataTable } from '$lib/components/table';
	import type { Collection } from '$lib/types';
	import RecordPage from './records/[recordId]/+page.svelte';
	import { pushState, preloadData, goto } from '$app/navigation';
	import { page } from '$app/stores';
	import * as Drawer from '$lib/shadcn/components/ui/drawer';
	import { Button } from '$lib/shadcn/components/ui/button';

	export let data: PageData;
	// When the record page is closed, navigate back to the collection page
	const onOpenChange = (isOpen: boolean) => !isOpen && history.back();

	$: ({ collection, schema, title } = data);
	$: items = collection.items;

	// $: if (!$recordIsOpen) history.back();

	const onRecordRowClick = async (event: Event, row: Collection) => {
		const rowCheckboxSelector = '[role="checkbox"]';
		const rowActionsSelector = '[data-menu-trigger]';

		const isCheckbox = (event.target as HTMLElement)!.closest(rowCheckboxSelector);
		const isActions = (event.target as HTMLElement)!.closest(rowActionsSelector);
		const isCellContent = (event.target as HTMLElement)!.parentNode?.nodeName === 'TD';

		//If the click was on a checkbox, don't do anything
		if (isCheckbox || isActions || isCellContent) {
			console.log('checkbox clicked');
			event.preventDefault();
			return;
		}

		const recordHref = `${$page.url.pathname}records/${row.id}`;

		//Prelaod the data for the record page
		const result = await preloadData(recordHref);

		console.log(schema);

		if (result.type === 'loaded' && result.status === 200) {
			//Remove unserilizable data from the result
			delete result.data?.menu;

			pushState(recordHref, { recordPageData: result.data });
		} else {
			// something bad happened! try navigating
			goto(recordHref);
		}
	};
</script>

{#key schema}
	<DataTable {title} {schema} data={items} rowClickCallback={onRecordRowClick} />

	<Drawer.Root open={!!$page.state.recordPageData} {onOpenChange}>
		<Drawer.Content>
			<Drawer.Header>
				<Drawer.Title class="font-normal"
					>Editing <span class="font-bold">{title}</span> record</Drawer.Title
				>
				<Drawer.Description>This action cannot be undone.</Drawer.Description>
				<RecordPage data={$page.state.recordPageData} />
			</Drawer.Header>
			<Drawer.Footer>
				<Button>Save</Button>
				<Drawer.Close>Close</Drawer.Close>
			</Drawer.Footer>
		</Drawer.Content>
	</Drawer.Root>
{/key}

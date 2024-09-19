<script lang="ts">
	import type { PageData } from './$types';
	import { DataTable } from '$lib/components/table';
	import type { Collection } from '$lib/types';
	// import Record from '$lib/components/record/record.svelte';
	import RecordPage from './records/[id]/+page.svelte';
	import { writable } from 'svelte/store';
	import { pushState } from '$app/navigation';
	import { page } from '$app/stores';
	import * as Drawer from '$lib/shadcn/components/ui/drawer';
	import { Button } from '$lib/shadcn/components/ui/button';

	export let data: PageData;

	$: ({ collection, schema, title } = data);
	$: items = collection.items;
	$: recordOpened = writable(false);

	const showRecord = (id: string) => {
		pushState(`/collections/${id}`);
	};

	const rowClickCallback = (event: Event, row: Collection) => {
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

		// If the click was on a row, open the record
		$recordOpened = true;
	};
</script>

{#key schema}
	<DataTable {title} {schema} data={items} {rowClickCallback} />

	<!-- <Record isOpened={$recordOpened} bind:onOpenedChanged={recordOpened} /> -->

	<Drawer.Root bind:open={$recordOpened}>
		<!-- <Drawer.Trigger>Open</Drawer.Trigger> -->
		<Drawer.Content>
			<Drawer.Header>
				<Drawer.Title>Are you sure absolutely sure?</Drawer.Title>
				<Drawer.Description>This action cannot be undone.</Drawer.Description>
			</Drawer.Header>
			<Drawer.Footer>
				<Button>Submit</Button>
				<Drawer.Close>Cancel</Drawer.Close>
			</Drawer.Footer>
		</Drawer.Content>
	</Drawer.Root>
{/key}

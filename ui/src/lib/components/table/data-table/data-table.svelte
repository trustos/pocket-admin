<script lang="ts">
	import { auth } from '$lib/stores';
	import { createTable, Render, Subscribe, createRender } from 'svelte-headless-table';
	import { writable } from 'svelte/store';
	import { createEventDispatcher, onMount } from 'svelte';
	import { Skeleton } from '$lib/shadcn/components/ui/skeleton';
	import {
		DataTableActions,
		DataTableHeader,
		DataTableCell,
		DataTableCheckbox
	} from '$lib/components/table';
	import type { Collection, CollectionSchema } from '$lib/types';
	import {
		addPagination,
		addSortBy,
		addTableFilter,
		addHiddenColumns,
		addSelectedRows
	} from 'svelte-headless-table/plugins';
	import * as Card from '$lib/shadcn/components/ui/card';
	import * as Table from '$lib/shadcn/components/ui/table';
	import { Button } from '$lib/shadcn/components/ui/button';
	import { Input } from '$lib/shadcn/components/ui/input';
	import * as DropdownMenu from '$lib/shadcn/components/ui/dropdown-menu';
	import { DeleteRecord, DeleteRecordAlert } from '$lib/components/record';
	// import { toast } from 'svelte-sonner';
	import { ErrorToast, WarningToast } from '$lib/components/toast';
	import { fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import ArrowUpDown from 'lucide-svelte/icons/arrow-up-down';
	import ChevronDown from 'lucide-svelte/icons/chevron-down';
	import { Trash2 } from 'lucide-svelte';
	import { ClientResponseError } from 'pocketbase';

	// Props
	export let data: Collection[] = [];
	export let schema: CollectionSchema = [];
	export let title: string = '';
	export let description: string = '';
	export let showHeaderIcons: boolean = true;
	export let rowClickCallback: (event: Event, row: Collection) => void = () => {};
	export let filterPlaceholder: string = '';
	export let listCollection = false;
	export let pagination:
		| {
				page: number;
				perPage: number;
				totalPages: number;
				totalItems: number;
		  }
		| undefined = undefined;
	export let onPageChange: ((page: number) => void) | undefined = undefined;
	export let loading: boolean = false;
	export let hiddenColumns: string[] = [];

	let internalHiddenColumns: string[] = [];

	onMount(() => {
		internalHiddenColumns = hiddenColumns;
	});

	// Constants
	const EXCLUDED_COLUMNS = [
		'collectionId',
		'collectionName',
		'schema',
		'listRule',
		'viewRule',
		'createRule',
		'updateRule',
		'deleteRule'
	];

	// Stores
	const dataStore = writable(data);
	const pageSize = writable(pagination?.perPage ?? 1000000);
	const pageIndex = writable(pagination?.page ? pagination.page - 1 : 0);
	let showDeleteAlert = writable(false);

	// Reactive statements
	$: dataStore.set(data);
	$: updatePagination(pagination);
	$: if (pluginStates.page) {
		pluginStates.page.pageSize.set(pagination?.perPage ?? 10);
		pluginStates.page.pageIndex.set((pagination?.page ?? 1) - 1);
	}

	// Functions
	function updatePagination(pag: typeof pagination) {
		if (pag) {
			pageSize.set(pag.perPage);
			pageIndex.set(pag.page - 1);
		} else {
			pageSize.set(1000000);
			pageIndex.set(0);
		}
	}

	// Table setup
	const tablePlugins = {
		sort: addSortBy(),
		filter: addTableFilter({
			fn: ({ filterValue, value }) => value.toLowerCase().includes(filterValue.toLowerCase())
		}),
		hide: addHiddenColumns(),
		select: addSelectedRows(),
		...(pagination
			? {
					page: addPagination({
						initialPageSize: pagination.perPage,
						initialPageIndex: pagination.page - 1
					})
				}
			: {})
	};

	const table = createTable(dataStore, tablePlugins);

	const colKeys = schema
		.map((s) => ({ name: s.name, type: s.type }))
		.filter((s) => !EXCLUDED_COLUMNS.includes(s.name));

	const cols = [
		...(!listCollection
			? [
					table.column({
						id: 'select',
						accessor: 'id',
						header: (_, { pluginStates }) => {
							return createRender(DataTableCheckbox, {
								checked: pluginStates.select.allRowsSelected
							});
						},
						cell: ({ row }, { pluginStates }) =>
							createRender(DataTableCheckbox, {
								checked: pluginStates.select.getRowState(row).isSelected,
								class: 'sticky left-0 z-20 bg-white dark:bg-gray-800'
							}),
						plugins: { sort: { disable: true }, filter: { exclude: true } }
					})
				]
			: []),
		...colKeys.map(({ name, type }) =>
			table.column({
				id: name,
				accessor: (row: Collection) => row[name as keyof Collection],
				header: () => createRender(DataTableHeader, { name, type, showIcons: showHeaderIcons }),
				cell: ({ value, row }: { value: unknown; row: { original: Collection } }) =>
					createRender(DataTableCell, { name, type, value, record: row.original }),
				plugins: { sort: { disable: name === 'id' } }
			})
		),
		...(!listCollection
			? [
					table.column({
						id: 'actions',
						accessor: 'id',
						header: '',
						cell: ({ value }) => createRender(DataTableActions, { id: value }),
						plugins: { sort: { disable: true } }
					})
				]
			: [])
	];

	const columns = table.createColumns(cols);
	const { headerRows, tableAttrs, tableBodyAttrs, pluginStates, flatColumns, rows } =
		table.createViewModel(columns);

	const { filterValue } = pluginStates.filter;
	const { hiddenColumnIds } = pluginStates.hide;
	const { selectedDataIds } = pluginStates.select;

	function resetSelectedRows() {
		selectedDataIds.set({});
	}

	$: selectedCount = Object.keys($selectedDataIds).length;

	// Event handling
	const dispatch = createEventDispatcher();

	function getSelectedRows(): Collection[] {
		const rowsIds = Object.keys($selectedDataIds);
		return rowsIds.length
			? rowsIds
					.map((id) => $rows.find((row) => row.id === id)?.original)
					.filter((row): row is Collection => row !== undefined)
			: [];
	}

	async function confirmDelete() {
		const rows = getSelectedRows();
		let updatedItems = [...data];

		for (const row of rows) {
			try {
				await auth.pb.collection(row.collectionName).delete(row.id);
				updatedItems = updatedItems.filter((item) => item.id !== row.id);
				WarningToast(`Record ${row.id} deleted`, {
					icon: Trash2,
					duration: 3000
				});
			} catch (error) {
				console.error(`Failed to delete record ${row.id}:`, error);
				ErrorToast(`Failed to delete record ${row.id}: ${(error as ClientResponseError).message}`);
			}
		}

		data = updatedItems;
		$showDeleteAlert = false;
		resetSelectedRows();
	}

	function handlePageChange(newPage: number) {
		if (onPageChange) {
			onPageChange(newPage);
		}
		if (pluginStates.page) {
			pluginStates.page.pageIndex.set(newPage - 1);
		}
	}

	function getPageRange(currentPage: number, totalPages: number): (number | string)[] {
		if (totalPages <= 7) {
			return Array.from({ length: totalPages }, (_, i) => i + 1);
		}

		if (currentPage <= 4) {
			return [1, 2, 3, 4, 5, '...', totalPages];
		}

		if (currentPage >= totalPages - 3) {
			return [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
		}

		return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
	}

	// Column hiding setup
	const ids = flatColumns.map((col) => col.id);
	let hideForId = Object.fromEntries(ids.map((id) => [id, true]));
	const colsForHiding = colKeys.map(({ name }) => name);
	const hidableCols = [...colsForHiding, 'id', 'created', 'updated'];

	$: $hiddenColumnIds = Object.entries(hideForId)
		.filter(([, hide]) => !hide)
		.map(([id]) => id);

	$: if (pluginStates.page) {
		pluginStates.page.pageSize.set($pageSize);
		pluginStates.page.pageIndex.set($pageIndex);
	}

	$: if (data) {
		dispatch('dataUpdate', data);
	}

	$: {
		if (hiddenColumns !== internalHiddenColumns) {
			internalHiddenColumns = hiddenColumns;
			$hiddenColumnIds = hiddenColumns;
		}
	}

	const updateHiddenColumns = (newHiddenColumns: string[]) => {
		internalHiddenColumns = newHiddenColumns;
		$hiddenColumnIds = newHiddenColumns;
		dispatch('columnVisibilityChange', newHiddenColumns);
	};
</script>

<Card.Root>
	<Card.Header class="flex-col px-7 sm:flex-row sm:items-center sm:justify-between">
		<div>
			<Card.Title>{title}</Card.Title>
			<Card.Description>{description}</Card.Description>
		</div>
		<div class="text-right md:text-center">
			<slot name="action"></slot>
		</div>
	</Card.Header>
	<Card.Content>
		<div class="flex items-center py-4">
			<Input
				class="focus:bg-muted-400 max-w-md"
				placeholder={filterPlaceholder}
				type="text"
				bind:value={$filterValue}
			/>
			{#if !listCollection}
				<DropdownMenu.Root>
					<DropdownMenu.Trigger asChild let:builder>
						<Button variant="outline" class="ml-auto" builders={[builder]}>
							Columns <ChevronDown class="ml-2 h-4 w-4" />
						</Button>
					</DropdownMenu.Trigger>
					<DropdownMenu.Content>
						{#each flatColumns as col}
							{#if hidableCols.includes(col.id)}
								<DropdownMenu.CheckboxItem
									checked={!internalHiddenColumns.includes(col.id)}
									onCheckedChange={(checked) => {
										let newHiddenColumns;
										if (checked) {
											newHiddenColumns = internalHiddenColumns.filter((id) => id !== col.id);
										} else {
											newHiddenColumns = [...internalHiddenColumns, col.id];
										}
										updateHiddenColumns(newHiddenColumns);
									}}
								>
									{col.id}
								</DropdownMenu.CheckboxItem>
							{/if}
						{/each}
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			{/if}
		</div>
		<div class="rounded-md border">
			<Table.Root {...$tableAttrs}>
				<Table.Header>
					{#each $headerRows as headerRow}
						<Subscribe rowAttrs={headerRow.attrs()}>
							<Table.Row class="group/table-head-row">
								{#each headerRow.cells as cell (cell.id)}
									<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()} let:props>
										{@const isFirstCol = cell.colstart == 0}
										<Table.Head
											{...attrs}
											class={`group-hover/table-head-row:bg-muted [&:has([role=checkbox])]:bg-card [&:has([role=checkbox])]:pr-3 ${isFirstCol ? 'sticky left-0 z-10' : ''}`}
										>
											{#if !props.sort.disabled}
												<Button variant="ghost" on:click={props.sort.toggle}>
													<Render of={cell.render()} />
													<ArrowUpDown class={'ml-2 h-4 w-4'} />
												</Button>
											{:else}
												<Render of={cell.render()} />
											{/if}
										</Table.Head>
									</Subscribe>
								{/each}
							</Table.Row>
						</Subscribe>
					{/each}
				</Table.Header>
				<Table.Body {...$tableBodyAttrs}>
					{#if loading}
						{#each Array(pagination?.perPage || 10) as _}
							<!-- Adjust the number of skeleton rows as needed -->
							<Table.Row>
								{#each flatColumns as column}
									<Table.Cell class="">
										{#each Array(2) as __}
											<Skeleton
												class="h-3 w-full bg-gray-300 dark:bg-gray-600 [&:not(:first-child)]:mt-[2px]"
											/>
										{/each}
									</Table.Cell>
								{/each}
							</Table.Row>
						{/each}
					{:else}
						{#each $rows as row (row.id)}
							<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
								<Table.Row
									on:click={(event) => rowClickCallback(event, row.original)}
									{...rowAttrs}
									data-state={$selectedDataIds[row.id] && 'selected'}
									class="group/table-row cursor-pointer"
								>
									{#each row.cells as cell (cell.id)}
										<Subscribe attrs={cell.attrs()} let:attrs>
											{@const isFirstCol = row.cells[0].id == cell.id}
											{@const isLastCol = row.cells[row.cells.length - 1].id == cell.id}
											<Table.Cell
												{...attrs}
												class={`pl-6 group-hover/table-row:bg-muted [&:has([data-menu-trigger])]:bg-card [&:has([role=checkbox])]:bg-card ${
													isFirstCol
														? 'sticky left-0 z-10 pl-2'
														: isLastCol
															? 'sticky right-0 z-10 pl-2'
															: ''
												}`}
											>
												<Render of={cell.render()} />
											</Table.Cell>
										</Subscribe>
									{/each}
								</Table.Row>
							</Subscribe>
						{/each}
					{/if}
				</Table.Body>
			</Table.Root>
		</div>

		{#if pagination}
			<div class="flex items-center justify-end space-x-4 py-4">
				<div class="flex-1 text-sm text-muted-foreground">
					{#if loading}
						<div class="flex-1">
							<Skeleton class="h-6 w-40 bg-gray-300 dark:bg-gray-600" />
						</div>
					{:else}
						<div class="flex-1 text-sm text-muted-foreground">
							{Object.keys($selectedDataIds).length} of {$rows.length} row(s) selected.
						</div>
					{/if}
				</div>
				<div class="flex items-center space-x-2">
					<Button
						variant="outline"
						size="sm"
						on:click={() => handlePageChange($pageIndex)}
						disabled={$pageIndex <= 0 || loading}
					>
						Previous
					</Button>

					{#if pagination.totalPages <= 7}
						{#each Array(pagination.totalPages) as _, i}
							<Button
								variant={i === $pageIndex ? 'default' : 'outline'}
								size="sm"
								on:click={() => handlePageChange(i + 1)}
							>
								{i + 1}
							</Button>
						{/each}
					{:else}
						{#each getPageRange($pageIndex + 1, pagination.totalPages) as pageNum}
							{#if pageNum === '...'}
								<span>{pageNum}</span>
							{:else}
								<Button
									variant={pageNum === $pageIndex + 1 ? 'default' : 'outline'}
									size="sm"
									on:click={() => handlePageChange(pageNum)}
								>
									{pageNum}
								</Button>
							{/if}
						{/each}
					{/if}

					<Button
						variant="outline"
						size="sm"
						on:click={() => handlePageChange($pageIndex + 2)}
						disabled={($pageIndex + 1) * $pageSize >= pagination.totalItems || loading}
					>
						Next
					</Button>
				</div>
			</div>
		{/if}
	</Card.Content>
</Card.Root>

{#if !listCollection && selectedCount > 0}
	<div
		class="fixed bottom-32 left-0 right-0 z-20 m-auto w-[400px] lg:left-52"
		transition:fly={{ delay: 10, duration: 250, x: 0, y: 300, opacity: 0.5, easing: quintOut }}
	>
		<DeleteRecord count={selectedCount} class="rounded-full shadow-2xl">
			<Button variant="outline" on:click={resetSelectedRows}>Reset</Button>
			<Button variant="destructive" on:click={() => ($showDeleteAlert = true)}>Delete</Button>
		</DeleteRecord>
	</div>
{/if}

<DeleteRecordAlert bind:open={$showDeleteAlert} confirmAction={confirmDelete} />

<style>
	:global([data-state='selected'] > td:has([role='checkbox'])),
	:global([data-state='selected'] > td:has([data-menu-trigger])) {
		@apply bg-muted;
	}
</style>

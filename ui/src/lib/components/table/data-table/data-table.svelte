<script lang="ts">
	import { createTable, Render, Subscribe, createRender } from 'svelte-headless-table';
	import { readable } from 'svelte/store';
	import {
		DataTableActions,
		DataTableHeader,
		DataTableCell,
		DataTableCheckbox
	} from '$lib/components/table';
	import type { Collection, ColProps, CollectionSchema } from '$lib/types';
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
	import ArrowUpDown from 'lucide-svelte/icons/arrow-up-down';
	import ChevronDown from 'lucide-svelte/icons/chevron-down';
	import { Input } from '$lib/shadcn/components/ui/input';
	import * as DropdownMenu from '$lib/shadcn/components/ui/dropdown-menu';

	import { Separator } from '$lib/shadcn/components/ui/separator';

	const excludedColumns = [
		'collectionId',
		'collectionName',
		'schema',
		'listRule',
		'viewRule',
		'createRule',
		'updateRule',
		'deleteRule'
	];

	export let data: Collection[] = [];
	export let schema: CollectionSchema[] = [];
	export let title: string = '';
	export let description: string = '';
	export let showHeaderIcons: boolean = true;

	const table = createTable(readable(data), {
		page: addPagination(),
		sort: addSortBy(),
		filter: addTableFilter({
			fn: ({ filterValue, value }) => value.toLowerCase().includes(filterValue.toLowerCase())
		}),
		hide: addHiddenColumns(),
		select: addSelectedRows()
	});

	const colKeys = schema
		.map((s) => ({ name: s.name, type: s.type }))
		.filter((s) => !excludedColumns.includes(s.name));

	const cols: ColProps<Collection>[] = colKeys.map(
		({ name, type }: { name: string; type: string }) => {
			return {
				accessor: name,
				header: () => {
					return createRender(DataTableHeader, { name, type, showIcons: showHeaderIcons });
				},
				cell: ({ value, row }: { value: unknown; row: { original: Collection } }) => {
					return createRender(DataTableCell, { name, type, value, record: row.original });
				},
				plugins: {
					sort: {
						disable: name === 'id'
					}
				}
			};
		}
	);

	// Add checkbox column
	cols.unshift({
		accessor: ({ id }: { id: string }) => id,
		header: (_, { pluginStates }) => {
			const { allPageRowsSelected } = pluginStates.select;
			return createRender(DataTableCheckbox, {
				checked: allPageRowsSelected
			});
		},
		cell: ({ row }, { pluginStates }) => {
			const { getRowState } = pluginStates.select;
			const { isSelected } = getRowState(row);

			return createRender(DataTableCheckbox, {
				checked: isSelected,
				class: 'sticky left-0 z-20 bg-white dark:bg-gray-800'
			});
		},
		plugins: {
			sort: {
				disable: true
			},
			filter: {
				exclude: true
			}
		}
	});

	cols.push({
		accessor: ({ id }: { id: string }) => id,
		header: '',
		cell: ({ value }: { value: string }) => {
			return createRender(DataTableActions, { id: value });
		},
		plugins: {
			sort: {
				disable: true
			}
		}
	});

	const columns = table.createColumns(cols.map((col) => table.column(col)));

	const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates, flatColumns, rows } =
		table.createViewModel(columns);

	const { hasNextPage, hasPreviousPage, pageIndex } = pluginStates.page;
	const { filterValue } = pluginStates.filter;
	const { hiddenColumnIds } = pluginStates.hide;
	const { selectedDataIds } = pluginStates.select;

	const ids = flatColumns.map((col) => col.id);
	let hideForId = Object.fromEntries(ids.map((id) => [id, true]));

	$: $hiddenColumnIds = Object.entries(hideForId)
		.filter(([, hide]) => !hide)
		.map(([id]) => id);

	const colsForHiding = colKeys.map(({ name }) => name);

	const hidableCols = [...colsForHiding, 'id', 'created', 'updated'];
</script>

<Card.Root>
	<Card.Header class="px-7">
		<Card.Title>{title}</Card.Title>
		<Card.Description>{description}</Card.Description>
	</Card.Header>
	<Card.Content>
		<!-- <Separator /> -->
		<div class="flex items-center py-4">
			<Input
				class="focus:bg-muted-400 max-w-md"
				placeholder="Filter collections"
				type="text"
				bind:value={$filterValue}
			/>
			<DropdownMenu.Root>
				<DropdownMenu.Trigger asChild let:builder>
					<Button variant="outline" class="ml-auto" builders={[builder]}>
						Columns <ChevronDown class="ml-2 h-4 w-4" />
					</Button>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content>
					{#each flatColumns as col}
						{#if hidableCols.includes(col.id)}
							<DropdownMenu.CheckboxItem bind:checked={hideForId[col.id]}>
								{col.id}
							</DropdownMenu.CheckboxItem>
						{/if}
					{/each}
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</div>
		<div class="rounded-md border">
			<!-- <Separator /> -->
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
					{#each $pageRows as row (row.id)}
						<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
							<Table.Row
								{...rowAttrs}
								data-state={$selectedDataIds[row.id] && 'selected'}
								class="group/table-row"
							>
								{#each row.cells as cell (cell.id)}
									<Subscribe attrs={cell.attrs()} let:attrs>
										{@const isFirstCol = row.cells[0].id == cell.id}
										{@const isLastCol = row.cells[row.cells.length - 1].id == cell.id}
										<Table.Cell
											{...attrs}
											class={`group-hover/table-row:bg-muted [&:has([role=checkbox])]:bg-card ${
												isFirstCol ? 'sticky left-0 z-10' : isLastCol ? 'sticky right-0 z-10' : ''
											}`}
										>
											<Render of={cell.render()} />
										</Table.Cell>
									</Subscribe>
								{/each}
							</Table.Row>
						</Subscribe>
					{/each}
				</Table.Body>
			</Table.Root>
		</div>

		<div class="flex items-center justify-end space-x-4 py-4">
			<div class="flex-1 text-sm text-muted-foreground">
				{Object.keys($selectedDataIds).length} of{' '}
				{$rows.length} row(s) selected.
			</div>
			<Button
				variant="outline"
				size="sm"
				on:click={() => ($pageIndex = $pageIndex - 1)}
				disabled={!$hasPreviousPage}>Previous</Button
			>
			<Button
				variant="outline"
				size="sm"
				disabled={!$hasNextPage}
				on:click={() => ($pageIndex = $pageIndex + 1)}>Next</Button
			>
		</div>
	</Card.Content>
</Card.Root>

<style>
	:global([data-state='selected'] > td:has([role='checkbox'])) {
		@apply bg-muted;
	}
</style>

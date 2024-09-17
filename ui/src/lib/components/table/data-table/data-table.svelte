<script lang="ts">
	import { createTable, Render, Subscribe, createRender } from 'svelte-headless-table';
	import { readable } from 'svelte/store';
	import { DataTableActions, DataTableHeader, DataTableCell } from '$lib/components/table';
	import type { Collections, ColProps, CollectionSchema } from '$lib/types';
	import {
		addPagination,
		addSortBy,
		addTableFilter,
		addHiddenColumns
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

	export let data: Collections[] = [];
	export let schema: CollectionSchema;
	export let showHeaderIcons: boolean = true;

	const table = createTable(readable(data), {
		page: addPagination(),
		sort: addSortBy(),
		filter: addTableFilter({
			fn: ({ filterValue, value }) => value.toLowerCase().includes(filterValue.toLowerCase())
		}),
		hide: addHiddenColumns()
	});

	type Column = {
		name: string;
		type: string;
	};

	const colKeys = schema
		.map((s): Column => ({ name: s.name, type: s.type }))
		.filter((s) => !excludedColumns.includes(s.name));

	const cols: ColProps<Collections>[] = colKeys.map(({ name, type }: Column) => {
		return {
			accessor: name,
			header: () => {
				return createRender(DataTableHeader, { name, type, showIcons: showHeaderIcons });
			},
			cell: ({ value, row }) => {
				return createRender(DataTableCell, { name, type, value, record: row.original });
			},
			plugins: {
				sort: {
					disable: name === 'id'
				}
			}
		};
	});

	//Add default columns - ID and Actions
	// cols.unshift({
	// 	accessor: 'id',
	// 	// header: 'ID',
	// 	header: ({ id }) => {
	// 		return createRender(DataTableHeader, { name: id, type: 'id', showIcons: showHeaderIcons });
	// 	},
	// 	cell: ({ id, value, row }) => {
	// 		return createRender(DataTableCell, { name: id, type: 'id', value, record: row.original });
	// 	},
	// 	plugins: {
	// 		sort: {
	// 			disable: true
	// 		}
	// 	}
	// });

	// cols.push({
	// 	accessor: 'created',
	// 	header: 'Created',
	// 	plugins: {
	// 		sort: {
	// 			disable: false
	// 		}
	// 	}
	// });

	// cols.push({
	// 	accessor: 'updated',
	// 	header: 'Updated',
	// 	plugins: {
	// 		sort: {
	// 			disable: false
	// 		}
	// 	}
	// });

	cols.push({
		accessor: ({ id }) => id,
		header: '',
		cell: ({ value }) => {
			return createRender(DataTableActions, { id: value });
		},
		plugins: {
			sort: {
				disable: true
			}
		}
	});

	const columns = table.createColumns(cols.map((col) => table.column(col)));

	const isSortableColumn = (cell) => {
		return !cell?.state?.columns.find((c) => c.id == cell.id)?.plugins?.sort?.disable;
	};

	const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates, flatColumns } =
		table.createViewModel(columns);

	const { hasNextPage, hasPreviousPage, pageIndex } = pluginStates.page;
	const { filterValue } = pluginStates.filter;
	const { hiddenColumnIds } = pluginStates.hide;

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
		<Card.Title>Collections</Card.Title>
		<Card.Description>All available collections</Card.Description>
	</Card.Header>
	<Card.Content>
		<!-- <Separator /> -->
		<div class="flex items-center py-4">
			<Input
				class="focus:bg-muted-400 max-w-md bg-muted"
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
		<Separator />
		<Table.Root {...$tableAttrs}>
			<Table.Header>
				{#each $headerRows as headerRow}
					<Subscribe rowAttrs={headerRow.attrs()}>
						<Table.Row>
							{#each headerRow.cells as cell (cell.id)}
								<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()} let:props>
									<Table.Head {...attrs}>
										{#if isSortableColumn(cell)}
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
						<Table.Row {...rowAttrs}>
							{#each row.cells as cell (cell.id)}
								<Subscribe attrs={cell.attrs()} let:attrs>
									<Table.Cell {...attrs}>
										<Render of={cell.render()} />
									</Table.Cell>
								</Subscribe>
							{/each}
						</Table.Row>
					</Subscribe>
				{/each}
			</Table.Body>
		</Table.Root>
		<div class="flex items-center justify-end space-x-4 py-4">
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

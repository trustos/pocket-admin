<script lang="ts">
	import type { PageData } from './$types';
	import { DataTable } from '$lib/components/table';
	import type { Collection } from '$lib/types';
	import RecordPage from './[recordId]/+page.svelte';
	import { pushState, preloadData, goto } from '$app/navigation';
	import { page } from '$app/stores';
	import * as Drawer from '$lib/shadcn/components/ui/drawer';
	import { Button } from '$lib/shadcn/components/ui/button';
	import Plus from 'lucide-svelte/icons/plus';
	import pb from '$lib/pocketbase';
	import { writable } from 'svelte/store';
	import { ErrorToast } from '$lib/components/toast';

	export let data: PageData;

	if (data.error) {
		console.log(data.error);
		ErrorToast(data.error.message);
		window.history.back();
	}

	$: ({ collection, schema, title, pagination, relationsToExpand } = data);
	$: items = collection?.items ?? [];

	const hiddenColumnsStore = writable<string[]>([]);

	let loading = false;

	const fetchPage = async (pageNum: number) => {
		const newCollection = await pb
			.collection(title!)
			.getList<Collection>(pageNum, pagination.perPage, {
				expand: relationsToExpand,
				sort: '-created'
			});

		collection = newCollection;
		items = newCollection.items;
		pagination = {
			...pagination,
			page: pageNum,
			totalPages: Math.ceil(newCollection.totalItems / pagination.perPage),
			totalItems: newCollection.totalItems
		};
	};

	const handleDataUpdate = (data: Collection[]) => {
		collection = { ...collection, items: data };
	};

	const navigateToRecord = async (recordId: string) => {
		const recordHref = `${$page.url.pathname}${recordId}`;
		const result = await preloadData(recordHref);

		if (result.type === 'loaded' && result.status === 200) {
			delete result.data?.menu;
			pushState(recordHref, { recordPageData: result.data });
		} else {
			goto(recordHref);
		}
	};

	const onAddNewRecordClick = () => navigateToRecord('newRecord');

	const onRecordRowClick = async (event: Event, row: Collection) => {
		const isCellContent =
			(event.target as HTMLElement)!.nodeName !== 'TD' ||
			!(event.target as HTMLElement)!.closest('td')?.contains(event.target as HTMLElement);

		if (isCellContent) {
			event.preventDefault();
			event.stopPropagation();
			return;
		}

		await navigateToRecord(row.id);
	};

	const onRecordClose = () => {
		if ($page.state.recordPageData) {
			setTimeout(() => window.history.back(), 200);
		}
	};

	const onPageChange = async (newPage: number) => {
		loading = true;
		try {
			await fetchPage(newPage);
			const url = new URL(window.location.href);
			url.searchParams.set('page', newPage.toString());
			pushState(url.toString(), { hiddenColumns: $hiddenColumnsStore });
			collection = { ...collection };
		} catch (error) {
			console.error('Error fetching page', error);
		} finally {
			loading = false;
		}
	};

	$: if ($page.state.hiddenColumns && Array.isArray($page.state.hiddenColumns)) {
		hiddenColumnsStore.set($page.state.hiddenColumns);
	}
</script>

{#key collection}
	<DataTable
		filterPlaceholder={'Filter records on the current page'}
		on:dataUpdate={({ detail }) => handleDataUpdate(detail)}
		on:columnVisibilityChange={({ detail }) => hiddenColumnsStore.set(detail)}
		{title}
		{schema}
		data={items}
		description={`All available records for ${title}`}
		rowClickCallback={onRecordRowClick}
		{pagination}
		{onPageChange}
		{loading}
		hiddenColumns={$hiddenColumnsStore}
	>
		<Button
			slot="action"
			class="mt-6 self-end sm:mt-0"
			variant="default"
			on:click={onAddNewRecordClick}
		>
			<Plus class="mr-2 h-4 w-4" />
			New record
		</Button>
	</DataTable>

	<Drawer.Root
		shouldScaleBackground
		open={!!$page.state.recordPageData}
		onClose={onRecordClose}
		backgroundColor={'black'}
	>
		<Drawer.Content class="max-h-[95vh] min-h-[95vh]">
			<Drawer.Header>
				<Drawer.Title class="font-normal"
					>Editing <span class="font-bold">{title}</span> record</Drawer.Title
				>
			</Drawer.Header>
			<RecordPage
				destroyCallback={onRecordClose}
				class="mt-[15px] h-full pt-5"
				data={{ ...JSON.parse(JSON.stringify($page.state.recordPageData)) }}
				cancelCallback={onRecordClose}
			/>
		</Drawer.Content>
	</Drawer.Root>
{/key}

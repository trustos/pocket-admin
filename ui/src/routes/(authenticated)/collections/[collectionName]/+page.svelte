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

	export let data: PageData;

	$: ({ collection, schema, title, pagination, relationsToExpand } = data);
	$: items = collection.items;

	$: {
		if (collection) {
			items = collection.items;
		}
	}

	const handleDataUpdate = (data: Collection[]) => {
		collection = { ...collection, items: data };
	};

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

	let loading = false;

	const onPageChange = async (newPage: number) => {
		loading = true;
		try {
			console.log('Page change requested:', newPage);
			await fetchPage(newPage);
			const url = new URL(window.location.href);
			url.searchParams.set('page', newPage.toString());
			pushState(url.toString(), {});

			// Force a re-render of the DataTable
			collection = { ...collection };
		} catch (error) {
			console.log('Error fetching page', error);
		} finally {
			loading = false;
		}
	};

	const onAddNewRecordClick = async () => {
		const recordHref = `${$page.url.pathname}${`newRecord`}`;

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
				window.history.back();
			}, 200);
		}
	};
</script>

{#key collection}
	<DataTable
		filterPlaceholder={'Filter records'}
		on:dataUpdate={({ detail }) => handleDataUpdate(detail)}
		{title}
		{schema}
		data={items}
		description={`All available records for ${title}`}
		rowClickCallback={onRecordRowClick}
		{pagination}
		{onPageChange}
		{loading}
	>
		<Button
			slot="action"
			class="mt-6 self-end sm:mt-0"
			variant="default"
			on:click={() => onAddNewRecordClick()}
		>
			<Plus class="mr-2 h-4 w-4" />
			New record
		</Button>
	</DataTable>

	<Drawer.Root
		shouldScaleBackground
		open={pageDataAvailable}
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

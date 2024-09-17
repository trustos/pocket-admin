<script lang="ts">
	import { Table, DataTable } from '$lib/components/table';
	import type { PageData } from './$types';

	export let data: PageData;

	const { collections, schema } = data;
</script>

<!-- <Table {collections} /> -->
<DataTable
	data={collections}
	{schema}
	showHeaderIcons={false}
	title="Collections"
	description="All available collections"
/>

<script lang="ts">
	import type { PageData } from './$types';
	import { DynamicTable, DataTable } from '$lib/components/table';

	export let data: PageData;

	$: ({ collection, schema, title } = data);
	$: items = collection.items;
</script>

<!-- <DynamicTable {title} {schema} {collection} /> -->

<DataTable {title} {schema} data={items} />

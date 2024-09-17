<script lang="ts">
	import type { PageData } from './$types';
	import { DataTable } from '$lib/components/table';

	export let data: PageData;

	$: ({ collection, schema, title } = data);
	$: items = collection.items;
</script>

{#key schema}
	<DataTable {title} {schema} data={items} />
{/key}

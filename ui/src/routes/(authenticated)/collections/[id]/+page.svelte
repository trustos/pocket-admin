<script lang="ts">
	import type { PageData } from './$types';
	import { DynamicTable } from '$lib/components/table';

	export let data: PageData;

	$: ({ collection, schema, title } = data);

	let description = `${title} This is a dynamic table component that renders a list of records based on the provided schema and collection.`;

	console.log(collection);
</script>

<DynamicTable bind:description bind:title {schema} {collection} />

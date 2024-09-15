<script lang="ts">
	import type { PageData } from './$types';
	import { DynamicTable } from '$lib/components/table';

	export let data: PageData;

	$: ({ collection, schema, title } = data);

	console.log(schema);

	let description = `${title} This is a dynamic table component that renders a list of records based on the provided schema and collection.`;
</script>

<DynamicTable bind:description bind:title {schema} {collection} />

<script lang="ts">
	import type { PageData } from './$types';
	import { DynamicTable } from '$lib/components/table';

	export let data: PageData;

	$: ({ collection, schema, title } = data);
</script>

<DynamicTable {title} {schema} {collection} />

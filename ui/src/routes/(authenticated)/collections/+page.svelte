<script lang="ts">
	import { Table } from '$lib/components/table';
	import type { PageData } from './$types';

	export let data: PageData;

	const { collections } = data;
</script>

<Table {collections} />

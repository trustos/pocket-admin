<script lang="ts">
	import type { PageData } from './$types';
	import { Table } from '$lib/components/table';

	export let data: PageData;
	const { collections } = data;
</script>

<main
	class="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-1 xl:grid-cols-1"
>
	<Table {collections} />
</main>

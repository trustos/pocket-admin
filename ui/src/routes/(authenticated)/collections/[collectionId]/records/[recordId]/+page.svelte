<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;

	const { record } = data;

	console.log(data);
</script>

<h1>{record.title}</h1>

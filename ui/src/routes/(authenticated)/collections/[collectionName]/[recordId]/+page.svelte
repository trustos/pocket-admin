<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;

	const { record, schema } = data;
</script>

<h1>{record.title}</h1>

{#if schema}
	{#each Object.keys(schema) as field}
		<p>{schema[field]['name']}: {schema[field]['type']}</p>
	{/each}
{/if}

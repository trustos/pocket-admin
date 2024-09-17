<script lang="ts">
	import Common from './common.svelte';
	import { NotAvailable } from '$lib/components/table/renderers';

	const isJsonString = (str) => {
		try {
			JSON.parse(str);
		} catch (e) {
			return false;
		}
		return true;
	};

	export let value: string;
</script>

{#if value}
	{#if isJsonString(value)}
		{JSON.stringify(value)}
	{:else}
		<Common {value} />
	{/if}
{:else}
	<NotAvailable />
{/if}

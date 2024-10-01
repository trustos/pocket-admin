<script lang="ts">
	import { NotAvailable, CommonRenderer } from '$lib/components/table/renderers';

	const isJsonString = (str: string) => {
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
		<CommonRenderer {value} />
	{/if}
{:else}
	<NotAvailable />
{/if}

<script lang="ts">
	import { Badge } from '$lib/shadcn/components/ui/badge';
	import { NotAvailable } from '$lib/components/table/renderers';

	export let value: string | string[];

	const isArray = Array.isArray(value);
</script>

{#if isArray && value.length > 0}
	{#each value as item}
		<Badge variant="outline">
			{item}
		</Badge>
	{/each}
{:else if !isArray && value}
	<Badge variant="outline">
		{value}
	</Badge>
{:else}
	<NotAvailable />
{/if}

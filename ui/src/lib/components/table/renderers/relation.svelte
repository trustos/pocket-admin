<script lang="ts">
	import { Badge } from '$lib/shadcn/components/ui/badge';
	import NotAvailable from './notAvailable.svelte';

	export let value: string;
</script>

{#if value}
	<Badge variant="outline">
		{value}
	</Badge>
{:else}
	<NotAvailable />
{/if}

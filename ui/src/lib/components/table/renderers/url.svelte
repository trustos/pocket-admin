<script lang="ts">
	import { NotAvailable, CommonRenderer } from '$lib/components/table/renderers';

	export let value: string;
</script>

{#if value}
	<CommonRenderer {value} />
{:else}
	<NotAvailable />
{/if}

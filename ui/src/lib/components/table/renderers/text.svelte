<script lang="ts">
	import Common from './common.svelte';
	import { NotAvailable } from '$lib/components/table/renderers';

	export let value: string;
</script>

{#if value}
	<Common {value} />
{:else}
	<NotAvailable />
{/if}

<script lang="ts">
	import { NotAvailable } from '$lib/components/table/renderers';

	export let value: string;
</script>

{#if value}
	{@const date = new Date(value)}
	{@const currentDate = date.toISOString().slice(0, 10)}
	{@const currentTime = date.toISOString().slice(11, 19) + ' UTC'}
	<div class="datetime">
		<div class="truncate">{currentDate}</div>
		<div class="truncate text-xs text-muted-foreground">{currentTime}</div>
	</div>
{:else}
	<NotAvailable />
{/if}

<script lang="ts">
	import { NotAvailable } from '$lib/components/table/renderers';

	function formatDateTime(value: string) {
		const date = new Date(value);
		console.log(date);
		// currentDate = date.toISOString().slice(0, 10); // Format: YYYY-MM-DD
		// currentTime = date.toISOString().slice(11, 19) + ' UTC'; // Format: HH:MM:SS UTC
	}

	$: formatDateTime(value);

	export let value: string;

	// Update date and time when the component mounts
	// const interval = setInterval(formatDateTime, 1000); // Update every second
	// return () => clearInterval(interval); // Clear interval on component destroy
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

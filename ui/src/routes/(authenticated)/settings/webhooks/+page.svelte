<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	const entries = data.settings?.webhooks.entries ?? [];
	const logs = data.settings?.webhooks.logs ?? [];
</script>

<div class="container mx-auto p-4">
	<h1 class="mb-4 text-2xl font-bold">Webhooks Settings</h1>

	<div class="mb-4">
		<label for="theme-select" class="mb-2 block text-sm font-medium">Theme</label>
	</div>
</div>

{#if data.settings}
	<pre>{JSON.stringify({ entries, logs }, null, 2)}</pre>
{:else}
	<p>No settings found</p>
{/if}

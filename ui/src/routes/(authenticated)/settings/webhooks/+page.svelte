<script lang="ts">
	import type { PageData } from './$types';
	import { WebhookTable } from '$lib/components/webhooks';

	export let data: PageData;

	$: settings = data.settings;
	$: webhooks = settings?.webhooks || { entries: [], logs: [] };
</script>

<div class="container mx-auto p-4">
	{#if settings}
		<WebhookTable entries={webhooks.entries} logs={webhooks.logs} {settings} />
	{:else}
		<p>Loading settings...</p>
	{/if}
</div>

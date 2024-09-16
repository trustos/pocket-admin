<script lang="ts">
	import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
	import { NotAvailable } from '$lib/components/table/renderers';
	import type { Collection } from '$lib/types';

	const fileUrl = (collectionIdOrName?: string, recordId?: string, fileName?: string) =>
		`${PUBLIC_POCKETBASE_URL}api/files/${collectionIdOrName}/${recordId}/${fileName}?thumb=100x100`;

	$: src = fileUrl(collection?.collectionName, collection?.id, value[0]);

	export let collection: Collection;
	export let value: string[];
</script>

{#if value.length}
	<img {src} width="36px" height="36px" alt="Record" class="overflow-hidden rounded-md" />
{:else}
	<NotAvailable />
{/if}

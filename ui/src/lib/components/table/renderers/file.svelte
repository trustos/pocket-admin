<script lang="ts">
	import { NotAvailable } from '$lib/components/table/renderers';
	import { auth } from '$lib/stores';
	import type { Collection } from '$lib/types';
	import Placeholder from '$lib/images/file-placeholder.svg';

	export let collection: Collection;
	export let value: string | string[];

	const onImgErrorHandler = (event: Event) => {
		const target = event.target as HTMLImageElement;
		target.src = Placeholder;
		target.style.padding = '10px';
	};

	const src = (fileName: string) =>
		auth.pb.files.getUrl(collection, fileName, { thumb: '100x100' });
</script>

{#if value.length}
	{#if Array.isArray(value)}
		{#each value as fileName}
			<img
				src={src(fileName)}
				width="36px"
				height="36px"
				alt="Record"
				class="overflow-hidden rounded-md border-[1px]"
				on:error={onImgErrorHandler}
			/>
		{/each}
	{:else}
		<img
			src={src(value)}
			width="36px"
			height="36px"
			alt="Record"
			class="overflow-hidden rounded-md"
			on:error={onImgErrorHandler}
		/>
	{/if}
{:else}
	<NotAvailable />
{/if}

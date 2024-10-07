<script lang="ts">
	import { auth } from '$lib/stores';
	import { Tooltip } from '$lib/components/common';
	import { Badge } from '$lib/shadcn/components/ui/badge';
	import Placeholder from '$lib/images/file-placeholder.svg';

	import X from 'lucide-svelte/icons/x';
	import type { RecordModel } from 'pocketbase';
	import type { Writable } from 'svelte/store';

	const getFileName = (file: string | File) => {
		if (file instanceof File) {
			return file.name;
		}

		return file;
	};

	const isFile = (fileName: unknown) => fileName instanceof File;

	// Remove the file from the form data
	const removeFileHandler = (file: string | File | string[]) => {
		if (singleFile) {
			value = '';
			formData.set({
				...$formData,
				[attrs.name as string]: value
			});
		} else {
			if (Array.isArray(value)) {
				value = value.filter((f) => f !== file);
				formData.set({
					...$formData,
					[attrs.name as string]: value
				});
			}
		}
	};

	const onImgErrorHandler = (event: Event) => {
		const target = event.target as HTMLImageElement;
		target.src = Placeholder;
		target.style.padding = '10px';
	};

	const url = (fileName: string | File) => {
		// If it's a file object, we need to read it as a data URL
		if (fileName instanceof File) {
			return URL.createObjectURL(fileName);
		}
		if (record) {
			return auth.pb.files.getUrl(record, fileName, { thumb: '100x100' });
		}
		// If there's no record, return a placeholder or handle it appropriately
		return Placeholder;
	};

	export let value: string[] | string;
	export let formData: Writable<{ [x: string]: unknown }>;
	export let attrs: Record<string, unknown>;
	export let record: RecordModel | undefined = undefined;
	export let singleFile: boolean = false;
</script>

<div
	class="grid grid-cols-2 gap-x-0 gap-y-4 sm:grid-cols-4 md:grid-cols-6 md:gap-4 lg:grid-cols-6 xl:grid-cols-8"
>
	{#if typeof value === 'string' && singleFile}
		{@const src = url(value)}

		<Tooltip text={getFileName(value)}>
			<figure
				class="group/file relative flex h-[100px] w-[100px] cursor-pointer items-center justify-center overflow-hidden rounded-md border-[1px] border-gray-200 transition-all hover:translate-y-1 hover:border-gray-300 hover:shadow-t-md"
				data-fs-control
			>
				{#if isFile(value)}
					<Badge
						class="pointer-events-none absolute left-1 top-1 z-10 bg-green-500 opacity-80 hover:bg-green-800"
						>New!</Badge
					>
				{/if}

				<div
					role="button"
					tabindex="-1"
					on:click|stopPropagation={() => removeFileHandler(value)}
					on:keydown={(e) => e.key === 'Enter' && removeFileHandler(value)}
					class="absolute right-1 top-1 cursor-pointer rounded-full bg-muted opacity-0 transition-opacity group-hover/file:opacity-100"
				>
					<X />
				</div>

				<img
					on:error={(event) => onImgErrorHandler(event)}
					{src}
					width="100px"
					height="100px"
					alt="Record"
					class="overflow-hidden"
				/>
			</figure>
		</Tooltip>
	{:else}
		{#each value as fileName}
			{@const src = url(fileName)}
			<Tooltip text={getFileName(fileName)}>
				<figure
					class="group/file relative flex h-[100px] w-[100px] cursor-pointer items-center justify-center overflow-hidden rounded-md border-[1px] border-gray-200 transition-all hover:translate-y-1 hover:border-gray-300 hover:shadow-t-md"
					data-fs-control
				>
					{#if isFile(fileName)}
						<Badge
							class="pointer-events-none absolute left-1 top-1 z-10 bg-green-500 opacity-80 hover:bg-green-800"
							>New!</Badge
						>
					{/if}

					<div
						role="button"
						tabindex="-1"
						on:click|stopPropagation={() => removeFileHandler(fileName)}
						on:keydown={(e) => e.key === 'Enter' && removeFileHandler(fileName)}
						class="absolute right-1 top-1 cursor-pointer rounded-full bg-muted opacity-0 transition-opacity group-hover/file:opacity-100"
					>
						<X />
					</div>
					<img
						on:error={(event) => onImgErrorHandler(event)}
						{src}
						width="100px"
						height="100px"
						alt="Record"
						class="overflow-hidden"
					/>
				</figure>
			</Tooltip>
		{/each}
	{/if}
</div>

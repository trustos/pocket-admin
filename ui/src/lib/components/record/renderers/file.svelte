<script lang="ts">
	import pb from '$lib/pocketbase';

	import { Input, type FormInputEvent } from '$lib/shadcn/components/ui/input';
	import { Badge } from '$lib/shadcn/components/ui/badge';
	import X from 'lucide-svelte/icons/x';
	import { Tooltip } from '$lib/components/common';
	import Placeholder from '$lib/images/file-placeholder.svg';

	import type { RecordModel } from 'pocketbase';
	import { type SuperForm } from 'sveltekit-superforms';
	import type { SchemaField } from '$lib/types';

	export let attrs: Record<string, unknown>;
	export let value: string[];
	export let record: RecordModel;
	export let options: SchemaField['options'];
	export let form: SuperForm<RecordModel, RecordModel>;

	const { collectionId, id } = record;
	const { form: formData } = form;

	const url = (fileName: string | File) => {
		// If the is a file object, we need to read it as a data URL
		if (fileName instanceof File) {
			return URL.createObjectURL(fileName);
		}

		return pb.files.getUrl(record, fileName, { thumb: '100x100' });
	};

	const inputHandler = async (event: FormInputEvent) => {
		const newImage = Array.from(event.currentTarget.files ?? []);

		const formDataKey = attrs['name'] as keyof typeof $formData;
		if (formDataKey in $formData) {
			$formData[formDataKey] = [...($formData[formDataKey] as Array<string | File>), ...newImage];
		} else {
			console.error(`Key ${String(formDataKey)} not found in formData`);
		}
	};

	const isFile = (fileName: unknown) => fileName instanceof File;

	const getFileName = (file: string | File) => {
		if (file instanceof File) {
			return file.name;
		}

		return file;
	};

	const removeFileHandler = (file: string | File) => {
		value = value.filter((f) => f !== file);
		formData.set({
			...$formData,
			[attrs.name as string]: value
		});
	};

	const onImgErrorHandler = (event: Event) => {
		const target = event.target as HTMLImageElement;
		target.src = Placeholder;
		target.style.padding = '10px';
	};

	const allowedMimeTypes = options?.mimeTypes ?? [];
</script>

{#if collectionId && id && value.length}
	<div
		class="grid grid-cols-2 gap-x-0 gap-y-4 sm:grid-cols-4 md:grid-cols-6 md:gap-4 lg:grid-cols-6 xl:grid-cols-8"
	>
		{#each value as fileName}
			{@const src = url(fileName)}
			<Tooltip text={getFileName(fileName)}>
				<figure
					class="group/file hover:shadow-t-md relative flex h-[100px] w-[100px] cursor-pointer items-center justify-center overflow-hidden rounded-md border-[1px] border-gray-200 transition-all hover:translate-y-1 hover:border-gray-300"
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
	</div>
{/if}
<Input
	{...attrs}
	type="file"
	multiple
	on:input={inputHandler}
	accept={allowedMimeTypes.join(',')}
/>

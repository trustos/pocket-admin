<script lang="ts">
	import { Input, type FormInputEvent } from '$lib/shadcn/components/ui/input';
	import FilePreview from '$lib/components/record/renderers/file/file-preview.svelte';

	import type { RecordModel } from 'pocketbase';
	import { type SuperForm } from 'sveltekit-superforms';
	import type { SchemaField } from '$lib/types';

	export let attrs: Record<string, unknown>;
	export let value: string[] | string;
	export let record: RecordModel | undefined;
	export let options: SchemaField['options'];
	export let form: SuperForm<{ [x: string]: unknown }>;

	let collectionId: string | undefined;
	let id: string | undefined;

	let singleFile = (options?.maxSelect ?? 1) <= 1;

	$: if (record) {
		({ collectionId, id } = record);
	}

	const { form: formData } = form;

	const inputHandler = async (event: FormInputEvent) => {
		const newImage = Array.from(event.currentTarget.files ?? []);

		const formDataKey = attrs['name'] as keyof typeof $formData;

		if (singleFile) {
			$formData[formDataKey] = newImage;
		} else {
			if (formDataKey in $formData) {
				if ($formData[formDataKey] as Array<string | File>) {
					$formData[formDataKey] = [
						...($formData[formDataKey] as Array<string | File>),
						...newImage
					];
				} else {
					$formData[formDataKey] = newImage;
				}
			} else {
				console.error(`Key ${String(formDataKey)} not found in formData`);
			}
		}
	};

	const allowedMimeTypes = options?.mimeTypes ?? [];
</script>

{#if value}
	<FilePreview {record} {value} {attrs} {formData} {singleFile} />
{/if}
<Input
	class="mt-6"
	{...attrs}
	type="file"
	multiple
	on:input={inputHandler}
	accept={allowedMimeTypes.join(',')}
/>

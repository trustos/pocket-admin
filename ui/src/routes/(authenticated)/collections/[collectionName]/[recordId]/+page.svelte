<script lang="ts">
	import * as Card from '$lib/shadcn/components/ui/card';
	import type { PageData } from './$types';
	import { cn } from '$lib/shadcn/utils';
	import * as Form from '$lib/shadcn/components/ui/form';
	import { recordSchema } from '$lib/schemas';
	import { fieldIcons } from '$lib/types';
	import { auth } from '$lib/stores';
	import { RecordField } from '$lib/components/record';
	import { excludeRecordProperties } from '$lib/helpers';
	import { page } from '$app/stores';

	export let data: PageData;
	export let className = '';
	export let destroyCallback = () => {};
	export let cancelCallback: (() => void) | undefined = undefined;
	export { className as class };

	const { record, schema } = data;

	import { superForm, defaults } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import Button from '$lib/shadcn/components/ui/button/button.svelte';
	import { goto } from '$app/navigation';
	import { CheckCircle } from 'lucide-svelte';
	import { ErrorToast, SuccessToast } from '$lib/components/toast';
	import type { ClientResponseError } from 'pocketbase';

	const goPreviousPath = () => {
		goto(`/admin/collections/${$page.params.collectionName}`);
	};

	const dynamicSchema = zod(recordSchema(schema));

	// Exclude fields that should not be editable
	const nonEditableFields = [
		'id',
		'created',
		'updated',
		'collectionId',
		'collectionName',
		'expand',
		'role'
	];

	const editableRecord = record
		? excludeRecordProperties(record, nonEditableFields)
		: defaults(dynamicSchema);

	const form = superForm(editableRecord, {
		SPA: true,
		dataType: 'json',
		validators: dynamicSchema,
		onUpdate: async ({ form }) => {
			try {
				if (form.valid) {
					if (record) {
						await auth.pb.collection(record.collectionName).update(record.id, form.data);
					} else {
						await auth.pb.collection($page.params.collectionName).create(form.data);
					}

					SuccessToast(
						`${!record ? 'Record created successfully!' : 'Record updated successfully'}`,
						{
							icon: CheckCircle,
							duration: 3000
						}
					);
				}
			} catch (error) {
				ErrorToast(
					`An error occurred while saving the record: ${(error as ClientResponseError).message}`
				);
			}
		},
		onResult: ({ result }) => {
			if (result.type == 'success') {
				destroyCallback();
			}
		}
	});

	const { form: formData, message, enhance } = form;

	// Initial form data
	const initialFormData = JSON.parse(JSON.stringify({ ...$formData }));

	// Compute for state changes
	$: hasDiff = JSON.stringify(initialFormData) !== JSON.stringify($formData);
</script>

<main
	class={cn(
		'flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-1 xl:grid-cols-1',
		className
	)}
>
	<form method="POST" use:enhance enctype="multipart/form-data">
		<Card.Root class="relative mx-auto w-full">
			<Card.Content
				autofocus={false}
				class={`relative space-y-4 overflow-auto pb-0 pt-5 ${className ? 'max-h-[80vh]' : ''}`}
			>
				{#if record?.id}
					<div class="text-left">
						<span class="text-muted-foreground">
							<svelte:component this={fieldIcons['id']} class="inline w-4" />
							id
						</span>
						<div
							class="mt-1 flex h-9 w-full rounded-md border border-input bg-muted px-3 py-2 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
						>
							{record?.id}
						</div>
					</div>
				{/if}

				{#each schema as entry}
					<Form.Field {form} name={entry.name} class="text-left">
						<Form.Control let:attrs>
							<Form.Label class="block">
								<span class="text-muted-foreground">
									<svelte:component this={fieldIcons[entry.type]} class="inline w-4" />
									{entry.name}

									{#if entry.type === 'date'}
										<span class="text-xs text-muted-foreground">(UTC)</span>
									{/if}
								</span>
							</Form.Label>
							<RecordField
								{form}
								{record}
								type={entry.type}
								{attrs}
								options={entry.options}
								bind:value={$formData[entry.name]}
							/>
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>
				{/each}

				<div
					class={`sticky -bottom-[1px] flex flex-row justify-center gap-4 border-t-2 bg-card pb-2 pt-2 ${className ? '' : ''}`}
				>
					{#if cancelCallback}
						<Button on:click={() => cancelCallback()} variant="secondary" class="w-52"
							>Cancel</Button
						>
					{:else}
						<Button on:click={() => goPreviousPath()} variant="secondary" class="w-52">Back</Button>
					{/if}
					<Form.Button class="w-52" disabled={!hasDiff}>Save</Form.Button>
				</div>
			</Card.Content>
		</Card.Root>
	</form>
</main>

<script lang="ts">
	import * as Card from '$lib/shadcn/components/ui/card';
	import type { PageData } from './$types';
	import { cn } from '$lib/shadcn/utils';
	import * as Form from '$lib/shadcn/components/ui/form';
	import { recordSchema } from '$lib/schemas';
	import { fieldIcons } from '$lib/types';
	import pb from '$lib/pocketbase';
	import { RecordField } from '$lib/components/record';
	import { excludeRecordProperties } from '$lib/helpers';

	export let data: PageData;
	export let className = '';
	export let destroyCallback = () => {};
	export { className as class };

	const { record, schema } = data;

	import { superForm } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import type { RecordModel } from 'pocketbase';

	const dynamicSchema = zod(recordSchema(schema));

	// Exclude fields that should not be editable
	const nonEditableFields = [
		'id',
		'created',
		'updated',
		'collectionId',
		'collectionName',
		'expand'
	];

	const editableRecord = excludeRecordProperties(record, nonEditableFields);

	const form = superForm(editableRecord, {
		SPA: true,
		dataType: 'json',
		validators: dynamicSchema,
		onUpdate: async ({ form }) => {
			console.log(form);
			if (form.valid) {
				pb.collection(record.collectionName).update(record.id, form.data);
				// try {
				// 	await pb.collection('users').authWithPassword(form.data.email, form.data.password);
				// 	//Set the user store
				// } catch {
				// 	setMessage(form, 'Failed to authenticate.');
				// }
			}
		},
		onResult: ({ result }) => {
			if (result.type == 'success') {
				destroyCallback();
			}
		}
	});

	const { form: formData, message, enhance } = form;

	// console.log(schema);
</script>

<main
	class={cn(
		'grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-1 xl:grid-cols-1',
		className
	)}
>
	<form method="POST" use:enhance enctype="multipart/form-data">
		<Card.Root class="relative mx-auto w-full">
			<Card.Content class={`space-y-4 overflow-auto pb-24 pt-5 ${className ? 'max-h-[75vh]' : ''}`}>
				<div class="text-left">
					<span class="text-muted-foreground">
						<svelte:component this={fieldIcons['id']} class="inline w-4" />
						id
					</span>
					<div
						class="mt-1 flex h-9 w-full rounded-md border border-input bg-muted px-3 py-2 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
					>
						{record.id}
					</div>
				</div>
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
			</Card.Content>
			<Card.Footer
				class={`absolute bottom-0 w-full rounded-b-lg bg-card pb-4 pt-4 ${className ? 'shadow-top' : ''}`}
			>
				<Form.Button class="w-full">Save</Form.Button>
			</Card.Footer>
		</Card.Root>
	</form>
</main>

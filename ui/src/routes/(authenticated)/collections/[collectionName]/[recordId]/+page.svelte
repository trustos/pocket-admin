<script lang="ts">
	import * as Card from '$lib/shadcn/components/ui/card';
	import type { PageData } from './$types';
	import { cn } from '$lib/shadcn/utils';
	import * as Form from '$lib/shadcn/components/ui/form';
	import { Input } from '$lib/shadcn/components/ui/input';
	import { recordSchema } from '$lib/schemas';
	import { fieldIcons } from '$lib/types';

	export let data: PageData;
	export let className = '';
	export { className as class };

	const { record, schema } = data;

	import { superForm, setMessage, defaults } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';

	// console.log(schema);
	// console.log(record);

	const dynamicSchema = zod(recordSchema(schema));

	console.log(dynamicSchema);

	const form = superForm(record, {
		SPA: true,
		validators: dynamicSchema,
		onUpdate: async ({ form }) => {
			console.log(form);
			if (form.valid) {
				console.log('validForm');
				// try {
				// 	await pb.collection('users').authWithPassword(form.data.email, form.data.password);
				// 	//Set the user store
				// } catch {
				// 	setMessage(form, 'Failed to authenticate.');
				// }
			}
		}
	});

	const { form: formData, message, enhance } = form;
</script>

<main
	class={cn(
		'grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-1 xl:grid-cols-1',
		className
	)}
>
	<form method="POST" use:enhance>
		<Card.Root class="mx-auto w-full">
			<Card.Content class={`space-y-4 overflow-auto pt-5 ${className ? 'max-h-[75vh]' : ''}`}>
				<div>
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
					<Form.Field {form} name={entry.name}>
						<Form.Control let:attrs>
							<Form.Label>
								<span class="text-muted-foreground">
									<svelte:component this={fieldIcons[entry.type]} class="inline w-4" />
									{entry.name}
								</span>
							</Form.Label>
							<Input {...attrs} bind:value={$formData[entry.name]} placeholder="m@example.com" />
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>
				{/each}
			</Card.Content>
		</Card.Root>
	</form>
</main>

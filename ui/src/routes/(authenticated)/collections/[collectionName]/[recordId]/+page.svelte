<script lang="ts">
	import * as Card from '$lib/shadcn/components/ui/card';
	import type { PageData } from './$types';
	import { cn } from '$lib/shadcn/utils';
	export let data: PageData;
	import * as Form from '$lib/shadcn/components/ui/form';
	import { Input } from '$lib/shadcn/components/ui/input';
	export let className = '';
	export { className as class };
	import { recordSchema } from '$lib/schemas';

	const { record, schema } = data;

	import { superForm, setMessage, defaults } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';

	// console.log(schema);
	// console.log(record);

	const dynamicSchema = zod(recordSchema(schema));

	console.log(dynamicSchema);

	const form = superForm(defaults(dynamicSchema), {
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
			<!-- <Card.Header>
				<Card.Title>Profile</Card.Title>
				<Card.Description>Your personal information</Card.Description>
			</Card.Header> -->
			<Card.Content class={`space-y-4 overflow-auto pt-5 ${className ? 'max-h-[75vh]' : ''}`}>
				<div>
					<span>id</span>
					<div
						class="mt-1 flex h-9 w-full rounded-md border border-input bg-muted px-3 py-2 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
					>
						{record.id}
					</div>
				</div>
				<!-- <Form.Field {form} name="id">
					<Form.Control>
						<Form.Label>id</Form.Label>
						<Input bind:value={record.id} disabled />
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field> -->

				<!-- {console.log(Object.keys(record))}
				{console.log(Object.entries(schema))}
				{console.log(record)}
				{console.log(schema)} -->

				{#each schema as entry}
					<Form.Field {form} name={entry.name}>
						<Form.Control let:attrs>
							<Form.Label>{entry.name}</Form.Label>
							<Input {...attrs} bind:value={$formData[entry.name]} placeholder="m@example.com" />
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>
				{/each}
				<!-- <h1>{record.title}</h1>

				{#if schema}
					{#each Object.keys(schema) as field}
						<p>{schema[field]['name']}: {schema[field]['type']}</p>
					{/each}
				{/if} -->
				<!-- <div class="space-y-2">
				<Label for="name">Name</Label>
				<p id="name" class="text-sm">{$user.name}</p>
			</div>
			<div class="space-y-2">
				<Label for="email">Email</Label>
				<p id="email" class="text-sm">{$user.email}</p>
			</div>
			{#each Object.entries($user) as [key, value]}
				{#if key !== 'name' && key !== 'email'}
					<div class="space-y-2">
						<Label for={key}>{key}</Label>
						<p id={key} class="text-sm">{value}</p>
					</div>
				{/if}
			{/each} -->
			</Card.Content>
		</Card.Root>
	</form>
</main>

<script lang="ts">
	import * as Form from '$lib/shadcn/components/ui/form';
	import * as Card from '$lib/shadcn/components/ui/card';
	import { Input } from '$lib/shadcn/components/ui/input';
	import { Alert } from '$lib/components/alert';
	import { fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { user } from '$lib/stores';

	import { superForm, setMessage, defaults } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import { loginSchema } from '$lib/schemas';
	import pb from '$lib/pocketbase';

	const form = superForm(defaults(zod(loginSchema)), {
		SPA: true,
		validators: zod(loginSchema),
		onUpdate: async ({ form }) => {
			if (form.valid) {
				try {
					await pb.collection('users').authWithPassword(form.data.email, form.data.password);
					//Set the user store
				} catch {
					setMessage(form, 'Failed to authenticate.');
				}
			}
		}
	});

	const { form: formData, message, enhance } = form;

	const clearMessage = () =>
		setTimeout(() => {
			$message = undefined;
		}, 3000);
</script>

<main class="theme-zinc flex h-screen w-full items-center justify-center px-4">
	<form method="POST" use:enhance>
		<Card.Root class="w-full max-w-sm">
			<Card.Header>
				{#if $message}
					<!-- transition:fade={{ delay: 100, duration: 200 }}  -->
					<div
						transition:fly={{
							delay: 250,
							duration: 300,
							x: 100,
							y: 500,
							opacity: 0.5,
							easing: quintOut
						}}
						on:introend={() => clearMessage()}
					>
						<Alert title="Login failed." description={$message} />
					</div>
				{/if}
				<Card.Title class="text-2xl">Login</Card.Title>
				<Card.Description>Enter your email below to login to your account.</Card.Description>
			</Card.Header>
			<Card.Content class="grid gap-4">
				<div class="grid gap-2">
					<Form.Field {form} name="email">
						<Form.Control let:attrs>
							<Form.Label>Email</Form.Label>
							<Input {...attrs} bind:value={$formData.email} placeholder="m@example.com" />
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>
				</div>
				<div class="grid gap-2">
					<Form.Field {form} name="password">
						<Form.Control let:attrs>
							<Form.Label>Password</Form.Label>
							<Input {...attrs} bind:value={$formData.password} type="password" />
						</Form.Control>

						<Form.FieldErrors />
					</Form.Field>
				</div>
			</Card.Content>
			<Card.Footer>
				<Form.Button class="w-full">Sign in</Form.Button>
			</Card.Footer>
		</Card.Root>
	</form>
</main>

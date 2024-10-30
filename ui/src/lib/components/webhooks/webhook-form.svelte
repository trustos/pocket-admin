<script lang="ts">
	import * as Dialog from '$lib/shadcn/components/ui/dialog';
	import { Button } from '$lib/shadcn/components/ui/button';
	import { Input } from '$lib/shadcn/components/ui/input';
	import { Badge } from '$lib/shadcn/components/ui/badge';
	import * as Form from '$lib/shadcn/components/ui/form';
	import { Separator } from '$lib/shadcn/components/ui/separator';
	import { Switch } from '$lib/shadcn/components/ui/switch';
	import { superForm } from 'sveltekit-superforms';
	import { webhookSchema } from '$lib/schemas/webhookSchema';
	import type { WebhookEntry } from '$lib/types';
	import { zod } from 'sveltekit-superforms/adapters';

	export let open = false;
	export let webhook: Partial<WebhookEntry> | null = null;
	export let onSubmit: (data: WebhookEntry) => Promise<void>;
	export let onClose: () => void;

	const eventOptions = [
		{ value: 'record.create', label: 'Record Created' },
		{ value: 'record.update', label: 'Record Updated' },
		{ value: 'record.delete', label: 'Record Deleted' }
	];

	const form = superForm(
		webhook || {
			// Use the webhook prop if provided
			name: '',
			url: '',
			headers: {
				Authorization: '',
				'Content-Type': 'application/json'
			},
			events: [],
			enabled: true,
			retryCount: 3
		},
		{
			SPA: true,
			validators: zod(webhookSchema),
			resetForm: true,
			dataType: 'json',
			onUpdate: ({ form }) => {
				if (form.valid) {
					onSubmit($formData as WebhookEntry);
				}
			}
		}
	);

	const { form: formData, enhance, reset } = form;

	function toggleEvent(event: string) {
		console.log(event);
		const events = $formData.events || [];
		const index = events.indexOf(event);

		if (index === -1) {
			$formData.events = [...events, event];
		} else {
			$formData.events = events.filter((e) => e !== event);
		}
	}

	async function handleSubmit() {
		if ($formData) {
			await onSubmit($formData as WebhookEntry);
			reset();
			open = false;
		}
	}

	// Reset form when webhook prop changes
	$: if (webhook) {
		$formData = {
			...webhook,
			headers: webhook.headers || {
				Authorization: '',
				'Content-Type': 'application/json'
			}
		};
	}
</script>

<Dialog.Root {open} onOpenChange={onClose}>
	<Dialog.Content class="sm:max-w-[600px]">
		<Dialog.Header>
			<Dialog.Title>{webhook ? 'Edit' : 'Add'} Webhook</Dialog.Title>
			<Dialog.Description>Configure webhook endpoint and settings.</Dialog.Description>
		</Dialog.Header>

		<form method="POST" use:enhance class="space-y-6">
			<Form.Field {form} name="name">
				<Form.Control let:attrs>
					<Form.Label>Name</Form.Label>
					<Input {...attrs} bind:value={$formData.name} placeholder="My Webhook" />
				</Form.Control>
				<Form.Description>A descriptive name for this webhook</Form.Description>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="url">
				<Form.Control let:attrs>
					<Form.Label>URL</Form.Label>
					<Input
						{...attrs}
						bind:value={$formData.url}
						placeholder="https://api.example.com/webhook"
					/>
				</Form.Control>
				<Form.Description>The URL that will receive webhook events</Form.Description>
				<Form.FieldErrors />
			</Form.Field>

			<Separator />

			<div class="space-y-4">
				<h4 class="text-sm font-medium">Headers</h4>
				<Form.Field {form} name="headers">
					<Form.Control let:attrs>
						<Form.Label>Authorization</Form.Label>
						<Input
							{...attrs}
							bind:value={$formData.headers.Authorization}
							placeholder="Bearer your-expected-token"
						/>
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
			</div>

			<Separator />

			<Form.Field {form} name="events">
				<Form.Control>
					<Form.Label>Events</Form.Label>
					<div class="flex flex-wrap gap-2">
						{#each eventOptions as event}
							<!-- Add a button wrapper or make the badge more interactive -->
							<div
								role="button"
								tabindex="0"
								on:click={() => toggleEvent(event.value)}
								on:keydown={(e) => e.key === 'Enter' && toggleEvent(event.value)}
							>
								<Badge
									variant={$formData.events?.includes(event.value) ? 'default' : 'outline'}
									class="cursor-pointer transition-all hover:scale-105"
								>
									{event.label}
								</Badge>
							</div>
						{/each}
					</div>
				</Form.Control>
				<Form.Description>Select which events will trigger this webhook</Form.Description>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="retryCount">
				<Form.Control let:attrs>
					<Form.Label>Retry Count</Form.Label>
					<Input type="number" {...attrs} bind:value={$formData.retryCount} min="0" max="10" />
				</Form.Control>
				<Form.Description>Number of retry attempts for failed webhook deliveries</Form.Description>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="enabled">
				<div class="flex items-center justify-between">
					<div class="space-y-0.5">
						<Form.Control let:attrs>
							<Form.Label>Enabled</Form.Label>
							<Form.Description>Toggle to enable or disable this webhook</Form.Description>
							<Switch {...attrs} bind:checked={$formData.enabled} />
						</Form.Control>
					</div>
				</div>
			</Form.Field>

			<Dialog.Footer>
				<Button type="button" variant="outline" on:click={onClose}>Cancel</Button>
				<!-- <Button type="submit">Save</Button> -->
				<Form.Button class="w-52">Save</Form.Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>

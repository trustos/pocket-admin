<!-- Component Renderers -->
<script lang="ts">
	import { createRender, createTable, Render, Subscribe } from 'svelte-headless-table';
	import { addSortBy, addTableFilter } from 'svelte-headless-table/plugins';
	import { writable } from 'svelte/store';
	import * as Table from '$lib/shadcn/components/ui/table';
	import * as Card from '$lib/shadcn/components/ui/card';
	import { Button } from '$lib/shadcn/components/ui/button';
	import { Input } from '$lib/shadcn/components/ui/input';
	import WebhookMenu from './webhook-menu.svelte';
	import { WebhookEventBadges, WebhookLogViewer, WebhookForm } from '$lib/components/webhooks';
	import { auth } from '$lib/stores';
	import { SuccessToast, ErrorToast } from '$lib/components/toast';
	import Plus from 'lucide-svelte/icons/plus';
	import type { WebhookEntry, WebhookLog, PASettings } from '$lib/types';
	import { BoolRenderer } from '$lib/components/table/renderers';

	export let entries: WebhookEntry[] = [];
	export let logs: WebhookLog[] = [];
	export let settings: PASettings;

	let showForm = false;
	let selectedWebhook: WebhookEntry | null = null;
	let filterValue = '';

	const handleEdit = (webhook: WebhookEntry) => {
		selectedWebhook = { ...webhook }; // Make a copy of the webhook data
		showForm = true;
	};

	const dataStore = writable(entries);

	async function handleDelete(webhook: WebhookEntry) {
		try {
			const updatedWebhooks = {
				...settings.webhooks,
				entries: settings.webhooks.entries.filter((e) => e.id !== webhook.id)
			};

			await auth.pb.collection('pa_settings').update(settings.id, {
				webhooks: updatedWebhooks
			});

			dataStore.set(updatedWebhooks.entries);
			SuccessToast('Webhook deleted successfully');
		} catch (error: unknown) {
			const errorMessage = error instanceof Error ? error.message : 'Unknown error';
			ErrorToast(`Failed to delete webhook: ${errorMessage}`);
		}
	}

	// async function handleToggleEnabled(webhook: WebhookEntry) {
	// 	try {
	// 		const updatedWebhook = {
	// 			...webhook,
	// 			enabled: !webhook.enabled,
	// 			updatedAt: new Date().toISOString()
	// 		};

	// 		const updatedWebhooks = {
	// 			...settings.webhooks,
	// 			entries: settings.webhooks.entries.map((e) => (e.id === webhook.id ? updatedWebhook : e))
	// 		};

	// 		await auth.pb.collection('pa_settings').update(settings.id, {
	// 			webhooks: updatedWebhooks
	// 		});

	// 		dataStore.set(updatedWebhooks.entries);
	// 		SuccessToast(`Webhook ${updatedWebhook.enabled ? 'enabled' : 'disabled'}`);
	// 	} catch (error: unknown) {
	// 		const errorMessage = error instanceof Error ? error.message : 'Unknown error';
	// 		ErrorToast(`Failed to update webhook: ${errorMessage}`);
	// 	}
	// }

	const table = createTable(dataStore, {
		sort: addSortBy(),
		filter: addTableFilter({
			fn: ({ filterValue, value }) =>
				String(value).toLowerCase().includes(filterValue.toLowerCase())
		})
	});

	const columns = table.createColumns([
		table.column({
			header: 'Name',
			accessor: 'name'
		}),
		table.column({
			header: 'URL',
			accessor: 'url'
		}),
		table.column({
			header: 'Events',
			accessor: (row) => row.events,
			cell: ({ value }) => createRender(WebhookEventBadges, { events: value })
		}),
		table.column({
			header: 'Status',
			accessor: (row) => row.enabled,
			cell: ({ value, row: tableRow }) =>
				createRender(BoolRenderer, {
					value,
					onChange: async (newValue) => {
						try {
							// Get the actual row data
							const rowData = tableRow.original as WebhookEntry;

							const updatedWebhooks = {
								...settings.webhooks,
								entries: settings.webhooks.entries.map((entry) =>
									entry.id === rowData.id
										? {
												...entry,
												enabled: newValue,
												updatedAt: new Date().toISOString()
											}
										: entry
								)
							};

							// Log the payload being sent
							console.log('Updating webhook with payload:', {
								webhooks: updatedWebhooks
							});

							await auth.pb.collection('pa_settings').update(settings.id, {
								webhooks: updatedWebhooks
							});

							// Update the store with the new data
							dataStore.set(updatedWebhooks.entries);

							SuccessToast(`Webhook ${newValue ? 'enabled' : 'disabled'}`);
						} catch (error: unknown) {
							const errorMessage = error instanceof Error ? error.message : 'Unknown error';
							ErrorToast(`Failed to update webhook: ${errorMessage}`);
						}
					}
				})
		}),
		table.column({
			header: 'Logs',
			accessor: (row) => row.id,
			cell: ({ value }) =>
				createRender(WebhookLogViewer, {
					logs: logs.filter((log) => log.webhookId === value)
				})
		}),
		table.column({
			header: '',
			accessor: (row) => row,
			cell: ({ value }) =>
				createRender(WebhookMenu, {
					webhook: value,
					onEdit: handleEdit, // Pass the handleEdit function here
					onDelete: handleDelete
				})
		})
	]);

	const { headerRows, rows, tableAttrs, tableBodyAttrs } = table.createViewModel(columns);

	async function handleSubmit(data: WebhookEntry) {
		try {
			const updatedWebhooks = {
				...settings.webhooks,
				entries: selectedWebhook
					? settings.webhooks.entries.map((e) =>
							e.id === selectedWebhook?.id
								? { ...data, id: e.id, updatedAt: new Date().toISOString() }
								: e
						)
					: [
							...settings.webhooks.entries,
							{
								...data,
								id: crypto.randomUUID(),
								createdAt: new Date().toISOString(),
								updatedAt: new Date().toISOString()
							}
						]
			};

			await auth.pb.collection('pa_settings').update(settings.id, {
				webhooks: updatedWebhooks
			});

			dataStore.set(updatedWebhooks.entries);
			SuccessToast(`Webhook ${selectedWebhook ? 'updated' : 'created'} successfully`);
			showForm = false;
			selectedWebhook = null;
		} catch (error: unknown) {
			const errorMessage = error instanceof Error ? error.message : 'Unknown error';
			ErrorToast(`Failed to ${selectedWebhook ? 'update' : 'create'} webhook: ${errorMessage}`);
		}
	}
</script>

<Card.Root>
	<Card.Header class="flex flex-row items-center justify-between">
		<div>
			<Card.Title>Webhooks</Card.Title>
			<Card.Description>
				Manage your webhook endpoints and see their delivery logs.
			</Card.Description>
		</div>
		<Button
			on:click={() => {
				selectedWebhook = null;
				showForm = true;
			}}
		>
			<Plus class="mr-2 h-4 w-4" />
			Add Webhook
		</Button>
	</Card.Header>
	<Card.Content>
		<div class="mb-4">
			<Input placeholder="Filter webhooks..." bind:value={filterValue} />
		</div>
		<div class="rounded-md border">
			<Table.Root {...$tableAttrs}>
				<Table.Header>
					<Subscribe rowAttrs={$headerRows[0].attrs()} let:rowAttrs>
						<Table.Row {...rowAttrs}>
							{#each $headerRows[0].cells as cell (cell.id)}
								<Subscribe attrs={cell.attrs()} let:attrs>
									<Table.Head {...attrs}>
										<Render of={cell.render()} />
									</Table.Head>
								</Subscribe>
							{/each}
						</Table.Row>
					</Subscribe>
				</Table.Header>
				<Table.Body {...$tableBodyAttrs}>
					{#each $rows as row (row.id)}
						<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
							<Table.Row {...rowAttrs}>
								{#each row.cells as cell (cell.id)}
									<Subscribe attrs={cell.attrs()} let:attrs>
										<Table.Cell {...attrs}>
											<Render of={cell.render()} />
										</Table.Cell>
									</Subscribe>
								{/each}
							</Table.Row>
						</Subscribe>
					{/each}
				</Table.Body>
			</Table.Root>
		</div>
	</Card.Content>
</Card.Root>

<WebhookForm
	bind:open={showForm}
	webhook={selectedWebhook}
	onSubmit={handleSubmit}
	onClose={() => {
		showForm = false;
		selectedWebhook = null;
	}}
/>

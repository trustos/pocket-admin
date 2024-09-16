<script lang="ts">
	import * as Card from '$lib/shadcn/components/ui/card';
	import * as Table from '$lib/shadcn/components/ui/table';
	import type { ListResultCollection, SchemaField } from '$lib/types';
	import { fieldIcons } from '$lib/types/constants';
	import CellRenderer from './renderers/cellRenderer.svelte';

	export let title: string = '';
	export let description: string = '';
	export let schema: SchemaField[];
	export let collection: ListResultCollection;
	export let onRowClick: (id: string) => void = () => {};

	console.log(schema);
</script>

<Card.Root class="w-full">
	<Card.Header>
		<Card.Title>{title}</Card.Title>
		<Card.Description>{description}</Card.Description>
	</Card.Header>
	<Card.Content>
		<div class="overflow-x-auto">
			<Table.Root>
				<Table.Header>
					<Table.Row>
						{#each schema as field}
							<Table.Head>
								<span class="text-nowrap">
									<svelte:component this={fieldIcons[field.type || 'any']} class="inline w-4" />
									{field.name}
								</span>
							</Table.Head>
						{/each}
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{#each collection.items as record}
						<Table.Row class="cursor-pointer" on:click={() => onRowClick(record.id)}>
							{#each schema as field}
								<Table.Cell class="max-w-64">
									<CellRenderer name={field.name} type={field.type} {record} />
								</Table.Cell>
							{/each}
						</Table.Row>
					{/each}
				</Table.Body>
			</Table.Root>
		</div>
	</Card.Content>
</Card.Root>

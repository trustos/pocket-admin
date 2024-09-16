<script lang="ts">
	import * as Card from '$lib/shadcn/components/ui/card/index.js';
	import * as Table from '$lib/shadcn/components/ui/table/index.js';
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import type { Collections } from '$lib/types';

	const goToCollection = (id: string) => {
		goto(`${base}/collections/${id}`);
	};

	export let collections: Collections[];
</script>

<Card.Root>
	<Card.Header class="px-7">
		<Card.Title>Collections</Card.Title>
		<Card.Description>All available collections</Card.Description>
	</Card.Header>
	<Card.Content>
		<Table.Root>
			<Table.Header>
				<Table.Row>
					<Table.Head>Name</Table.Head>
					<Table.Head class="hidden sm:table-cell">Type</Table.Head>
					<Table.Head class="text-right">Count</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#if !collections.length}
					<Table.Row>
						<Table.Cell colspan={3} class="bold h-16 text-center">
							No records found or you have no permission to view this data.
						</Table.Cell>
					</Table.Row>
				{:else}
					{#each collections as collection}
						<Table.Row class="cursor-pointer" on:click={() => goToCollection(collection.id)}>
							<Table.Cell>
								<div class="font-medium">{collection.name}</div>
								<div class="hidden text-sm text-muted-foreground md:inline">
									id: {collection.id}
								</div>
							</Table.Cell>
							<Table.Cell class="hidden sm:table-cell">
								{collection.type}
							</Table.Cell>
							<Table.Cell class="text-right">{collection.recordsCount}</Table.Cell>
						</Table.Row>
					{/each}
				{/if}
			</Table.Body>
		</Table.Root>
	</Card.Content>
</Card.Root>

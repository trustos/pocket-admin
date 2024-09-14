<script lang="ts">
	import * as Card from '$lib/shadcn/components/ui/card/index.js';
	import * as Table from '$lib/shadcn/components/ui/table/index.js';
	import { Badge } from '$lib/shadcn/components/ui/badge/index.js';
	import type { RecordModel } from 'pocketbase';
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';

	const goToCollection = (id: string) => {
		goto(`${base}/collections/${id}`);
	};

	export let collections: RecordModel[];
	console.log(collections);
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
				{#each collections as collection}
					<Table.Row class="cursor-pointer" on:click={() => goToCollection(collection.id)}>
						<Table.Cell>
							<div class="font-medium">{collection.name}</div>
							<div class="hidden text-sm text-muted-foreground md:inline">id: {collection.id}</div>
						</Table.Cell>
						<Table.Cell class="hidden sm:table-cell">
							{collection.type}
						</Table.Cell>
						<Table.Cell class="text-right">{collection.recordsCount}</Table.Cell>
					</Table.Row>
				{/each}
				<!-- <Table.Row>
					<Table.Cell>
						<div class="font-medium">Olivia Smith</div>
						<div class="hidden text-sm text-muted-foreground md:inline">olivia@example.com</div>
					</Table.Cell>
					<Table.Cell class="hidden sm:table-cell">Refund</Table.Cell>
					<Table.Cell class="hidden sm:table-cell">
						<Badge class="text-xs" variant="outline">Declined</Badge>
					</Table.Cell>
					<Table.Cell class="hidden md:table-cell">2023-06-24</Table.Cell>
					<Table.Cell class="text-right">$150.00</Table.Cell>
				</Table.Row>
				<Table.Row>
					<Table.Cell>
						<div class="font-medium">Liam Johnson</div>
						<div class="hidden text-sm text-muted-foreground md:inline">liam@example.com</div>
					</Table.Cell>
					<Table.Cell class="hidden sm:table-cell">Sale</Table.Cell>
					<Table.Cell class="hidden sm:table-cell">
						<Badge class="text-xs" variant="secondary">Fulfilled</Badge>
					</Table.Cell>
					<Table.Cell class="hidden md:table-cell">2023-06-23</Table.Cell>
					<Table.Cell class="text-right">$250.00</Table.Cell>
				</Table.Row>
				<Table.Row>
					<Table.Cell>
						<div class="font-medium">Noah Williams</div>
						<div class="hidden text-sm text-muted-foreground md:inline">noah@example.com</div>
					</Table.Cell>
					<Table.Cell class="hidden sm:table-cell">Subscription</Table.Cell>
					<Table.Cell class="hidden sm:table-cell">
						<Badge class="text-xs" variant="secondary">Fulfilled</Badge>
					</Table.Cell>
					<Table.Cell class="hidden md:table-cell">2023-06-25</Table.Cell>
					<Table.Cell class="text-right">$350.00</Table.Cell>
				</Table.Row>
				<Table.Row>
					<Table.Cell>
						<div class="font-medium">Emma Brown</div>
						<div class="hidden text-sm text-muted-foreground md:inline">emma@example.com</div>
					</Table.Cell>
					<Table.Cell class="hidden sm:table-cell">Subscription</Table.Cell>
					<Table.Cell class="hidden sm:table-cell">
						<Badge class="text-xs" variant="secondary">Fulfilled</Badge>
					</Table.Cell>
					<Table.Cell class="hidden md:table-cell">2023-06-26</Table.Cell>
					<Table.Cell class="text-right">$450.00</Table.Cell>
				</Table.Row>
				<Table.Row>
					<Table.Cell>
						<div class="font-medium">Liam Johnson</div>
						<div class="hidden text-sm text-muted-foreground md:inline">liam@example.com</div>
					</Table.Cell>
					<Table.Cell class="hidden sm:table-cell">Sale</Table.Cell>
					<Table.Cell class="hidden sm:table-cell">
						<Badge class="text-xs" variant="secondary">Fulfilled</Badge>
					</Table.Cell>
					<Table.Cell class="hidden md:table-cell">2023-06-23</Table.Cell>
					<Table.Cell class="text-right">$250.00</Table.Cell>
				</Table.Row>
				<Table.Row>
					<Table.Cell>
						<div class="font-medium">Olivia Smith</div>
						<div class="hidden text-sm text-muted-foreground md:inline">olivia@example.com</div>
					</Table.Cell>
					<Table.Cell class="hidden sm:table-cell">Refund</Table.Cell>
					<Table.Cell class="hidden sm:table-cell">
						<Badge class="text-xs" variant="outline">Declined</Badge>
					</Table.Cell>
					<Table.Cell class="hidden md:table-cell">2023-06-24</Table.Cell>
					<Table.Cell class="text-right">$150.00</Table.Cell>
				</Table.Row>
				<Table.Row>
					<Table.Cell>
						<div class="font-medium">Emma Brown</div>
						<div class="hidden text-sm text-muted-foreground md:inline">emma@example.com</div>
					</Table.Cell>
					<Table.Cell class="hidden sm:table-cell">Sale</Table.Cell>
					<Table.Cell class="hidden sm:table-cell">
						<Badge class="text-xs" variant="secondary">Fulfilled</Badge>
					</Table.Cell>
					<Table.Cell class="hidden md:table-cell">2023-06-26</Table.Cell>
					<Table.Cell class="text-right">$450.00</Table.Cell>
				</Table.Row> -->
			</Table.Body>
		</Table.Root>
	</Card.Content>
</Card.Root>

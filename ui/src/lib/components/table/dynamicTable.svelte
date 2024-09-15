<script lang="ts">
	import * as Card from '$lib/shadcn/components/ui/card';
	import * as Table from '$lib/shadcn/components/ui/table';
	import * as Badge from '$lib/shadcn/components/ui/badge';
	import type { ListResultCollection, SchemaFiledType } from '$lib/types';
	import type { RecordModel } from 'pocketbase';
	import { fieldIcons } from '$lib/types/constants';
	// import Key from 'lucide-svelte/icons/key';
	// import Calendar from 'lucide-svelte/icons/calendar';
	// import Braces from 'lucide-svelte/icons/braces';
	// import Asterisk from 'lucide-svelte/icons/asterisk';
	// import Type from 'lucide-svelte/icons/type';
	// import PencilLine from 'lucide-svelte/icons/pencil-line';
	// import Image from 'lucide-svelte/icons/image';
	// import Hash from 'lucide-svelte/icons/hash';
	// import ToggleLeft from 'lucide-svelte/icons/toggle-left';
	// import Mail from 'lucide-svelte/icons/mail';
	// import Link from 'lucide-svelte/icons/link';
	// import List from 'lucide-svelte/icons/list';
	// import Share2 from 'lucide-svelte/icons/share-2';

	export let title: string = '';
	export let description: string;
	export let schema: RecordModel[];
	export let collection: ListResultCollection;
	export let onRowClick: (id: string) => void = () => {};

	// const fieldIcons = {
	// 	any: Asterisk,
	// 	id: Key,
	// 	date: Calendar,
	// 	json: Braces,
	// 	text: Type,
	// 	editor: PencilLine,
	// 	file: Image,
	// 	number: Hash,
	// 	bool: ToggleLeft,
	// 	email: Mail,
	// 	url: Link,
	// 	select: List,
	// 	relation: Share2
	// };

	function renderCell(value: unknown, type: SchemaFiledType) {
		switch (type) {
			case 'text':
			case 'editor':
			case 'email':
			case 'url':
				return { html: `<span class="max-w-xs truncate">${value}</span>` };
			case 'number':
				return { html: `<span>${value}</span>` };
			case 'bool':
				return {
					component: Badge,
					props: { variant: value ? 'default' : 'secondary' },
					content: value ? 'True' : 'False'
				};
			case 'date':
				return { html: `<span>${new Date(value as string).toLocaleString()}</span>` };
			case 'select':
				return { component: Badge, props: { variant: 'outline' }, content: value };
			case 'file':
				return { html: `<span class="text-blue-500 hover:underline">File</span>` };
			case 'relation':
				return { html: `<span class="text-purple-500 hover:underline">Relation</span>` };
			case 'json':
				return {
					html: `<span class="font-mono text-sm">${JSON.stringify(value).slice(0, 20)}...</span>`
				};
			default:
				return { html: `<span>${String(value)}</span>` };
		}
	}
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
						<Table.Head>
							<span class="block text-nowrap">
								<svelte:component this={fieldIcons['id']} class="inline w-4" />
								id
							</span>
						</Table.Head>
						{#each schema as field}
							<Table.Head>
								<span class="text-nowrap">
									<svelte:component this={fieldIcons[field.type || 'any']} class="inline w-4" />
									{field.name}
								</span>
							</Table.Head>
						{/each}
						<Table.Head>
							<span class="block text-nowrap">
								<svelte:component this={fieldIcons['date']} class="inline w-4" />

								<!-- <Calendar class="inline w-4" /> -->
								created
							</span>
						</Table.Head>
						<Table.Head>
							<span class="text-nowrap">
								<svelte:component this={fieldIcons['date']} class="inline w-4" />
								updated
							</span>
						</Table.Head>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{#each collection.items as record}
						<Table.Row class="cursor-pointer" on:click={() => onRowClick(record.id)}>
							{#each schema as field}
								<Table.Cell>
									{#if renderCell(record[field.name], field.type).html}
										{@html renderCell(record[field.name], field.type).html}
									{:else}
										{field}
										{field.type}
										<!-- <svelte:component
											this={renderCell(record[field.name], field.type).component}
											{...renderCell(record[field.name], field.type).props}
										>
											{renderCell(record[field.name], field.type).content}
										</svelte:component> -->
									{/if}
								</Table.Cell>
							{/each}
						</Table.Row>
					{/each}
				</Table.Body>
			</Table.Root>
		</div>
	</Card.Content>
</Card.Root>

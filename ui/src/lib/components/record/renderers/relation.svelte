<script lang="ts">
	import { Badge } from '$lib/shadcn/components/ui/badge';
	import { Input } from '$lib/shadcn/components/ui/input';
	import * as Tooltip from '$lib/shadcn/components/ui/tooltip';
	import * as Dialog from '$lib/shadcn/components/ui/dialog';
	import type { Collection } from '$lib/types';
	import Info from 'lucide-svelte/icons/info';
	import type { RecordModel } from 'pocketbase';
	import RelationPicker from './relation/relation-picker.svelte';

	export let attrs: Record<string, unknown>;
	export let value: string | string[];
	export let record: RecordModel;

	const getValue = (record: RecordModel, name: string) => {
		const result = record?.expand && (record?.expand[name as keyof Collection] as RecordModel);

		if (Array.isArray(result)) {
			return result.map((r) => ({
				value: r?.['name'] || r?.['title'] || r?.id,
				record: r
			}));
		}

		return [
			{
				value: result?.['name'] || result?.['title'] || result?.id,
				record: result
			}
		];
	};

	const relations = getValue(record, attrs['name'] as string);
</script>

<!-- <Input {...attrs} bind:value /> -->

{#if value}
	{#each relations as relation}
		<Badge class="mb-2" variant="outline">
			<Tooltip.Root openDelay={0}>
				<Tooltip.Trigger>
					<Info class="inline w-4" />
				</Tooltip.Trigger>
				<Tooltip.Content>
					<pre>{JSON.stringify(relation.record, null, 2)}</pre>
				</Tooltip.Content>
			</Tooltip.Root>
			&nbsp;
			<span class="block truncate">
				{relation.value}
			</span>
		</Badge>
	{/each}
{/if}

<!-- <Dialog.Root>
	<Dialog.Trigger>Open</Dialog.Trigger>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Are you sure absolutely sure?</Dialog.Title>
			<Dialog.Description>
				This action cannot be undone. This will permanently delete your account and remove your data
				from our servers.
			</Dialog.Description>
		</Dialog.Header>
	</Dialog.Content>
</Dialog.Root> -->

<!-- <RelationPicker selectedRelations={[relation?.record]} /> -->

<!-- allRelations={[
		{ id: '1', name: 'test' },
		{ id: '2', name: 'telation' }
	]} -->

<script lang="ts">
	import { Badge } from '$lib/shadcn/components/ui/badge';
	import NotAvailable from './notAvailable.svelte';
	import type { Collection } from '$lib/types';
	import type { RecordModel } from 'pocketbase';
	import Info from 'lucide-svelte/icons/info';
	import * as Tooltip from '$lib/shadcn/components/ui/tooltip';
	import { getRelationName } from '$lib/helpers';

	export let value: string | string[];
	export let record: Collection;
	export let fieldName: string;

	const isExpanded = (name: string) => {
		return record[name] && record[name].length > 0;
	};

	const getValue = (record: Collection, name: string) => {
		const result = record?.expand && (record?.expand[name as keyof Collection] as RecordModel);

		if (Array.isArray(result)) {
			return result.map((r) => ({
				value: getRelationName(r),
				record: r
			}));
		}

		return [
			{
				value: getRelationName(result),
				record: result
			}
		];
	};

	const relations = getValue(record, fieldName);
</script>

{#if value && value.length > 0}
	{#each relations as relation}
		{#if isExpanded(fieldName)}
			<Badge class="mb-2" variant="outline">
				<Tooltip.Root openDelay={300}>
					<Tooltip.Trigger>
						<Info class="inline w-4" />
					</Tooltip.Trigger>
					<Tooltip.Content class="max-w-96">
						<pre>{JSON.stringify(relation.record, null, 2)}</pre>
					</Tooltip.Content>
				</Tooltip.Root>
				&nbsp;
				<span class="block truncate">
					{relation.value}
				</span>
			</Badge>
		{:else}
			<Badge variant="outline">
				{value}
			</Badge>
		{/if}
	{/each}
{:else}
	<NotAvailable />
{/if}

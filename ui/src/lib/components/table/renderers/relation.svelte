<script lang="ts">
	import { Badge } from '$lib/shadcn/components/ui/badge';
	import NotAvailable from './notAvailable.svelte';
	import type { Collection } from '$lib/types';
	import type { RecordModel } from 'pocketbase';
	import Info from 'lucide-svelte/icons/info';
	import * as Tooltip from '$lib/shadcn/components/ui/tooltip';

	export let value: string | string[];
	export let record: Collection;
	export let fieldName: string;

	const isExpanded = (name: string) => {
		return record[name] && record[name].length > 0;
	};

	const getValue = (record: Collection, name: string) => {
		const result = record?.expand && (record?.expand[name as keyof Collection] as RecordModel);

		return {
			value: result?.['name'] || result?.['title'] || result?.id,
			record: result
		};
	};
</script>

{#if value}
	{#if isExpanded(fieldName)}
		{@const relation = getValue(record, fieldName)}
		<Badge variant="outline">
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
	{:else}
		<Badge variant="outline">
			{value}
		</Badge>
	{/if}
{:else}
	<NotAvailable />
{/if}

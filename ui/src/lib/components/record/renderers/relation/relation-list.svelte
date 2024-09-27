<script lang="ts">
	import { getRelationName } from '$lib/helpers';
	import { Badge } from '$lib/shadcn/components/ui/badge';
	import { Button } from '$lib/shadcn/components/ui/button';
	import * as Tooltip from '$lib/shadcn/components/ui/tooltip';
	import Info from 'lucide-svelte/icons/info';
	import X from 'lucide-svelte/icons/x';
	import type { RecordModel } from 'pocketbase';

	export let relations: RecordModel[];
	export let onRemove: (relation: RecordModel) => void;
</script>

<ul class="space-y-2">
	{#each relations as relation (relation.id)}
		<li class="flex items-center justify-between rounded bg-secondary p-2">
			<Badge variant="secondary">
				<Tooltip.Root openDelay={300}>
					<Tooltip.Trigger>
						<Info class="inline w-4" />
					</Tooltip.Trigger>
					<Tooltip.Content class="max-w-96">
						<pre>{JSON.stringify(relation, null, 2)}</pre>
					</Tooltip.Content>
				</Tooltip.Root>
				&nbsp;
				<span class="block truncate">
					{getRelationName(relation)}
				</span>
			</Badge>
			<Button variant="ghost" class="rounded-full" size="icon" on:click={() => onRemove(relation)}>
				<X size="15" />
				<span class="sr-only">Remove</span>
			</Button>
		</li>
	{/each}
</ul>

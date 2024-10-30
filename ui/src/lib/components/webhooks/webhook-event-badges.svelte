<script lang="ts">
	import { Badge } from '$lib/shadcn/components/ui/badge';

	export let events: string[] = [];

	const getEventLabel = (event: string) => {
		const labels: Record<string, string> = {
			'record.create': 'Create',
			'record.update': 'Update',
			'record.delete': 'Delete'
		};
		return labels[event] || event;
	};

	const getEventVariant = (event: string) => {
		const variants: Record<string, 'default' | 'outline' | 'secondary'> = {
			'record.create': 'default',
			'record.update': 'secondary',
			'record.delete': 'outline'
		};
		return variants[event] || 'default';
	};
</script>

<div class="flex flex-wrap gap-1">
	{#each events as event}
		<Badge variant={getEventVariant(event)}>
			{getEventLabel(event)}
		</Badge>
	{/each}
</div>

<script lang="ts">
	import * as Popover from '$lib/shadcn/components/ui/popover';
	import { Button } from '$lib/shadcn/components/ui/button';
	import { ScrollArea } from '$lib/shadcn/components/ui/scroll-area';
	import { Badge } from '$lib/shadcn/components/ui/badge';
	import { cn } from '$lib/shadcn/utils';
	import History from 'lucide-svelte/icons/history';
	import type { WebhookLog } from '$lib/types';

	export let logs: WebhookLog[] = [];

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleString();
	};

	$: sortedLogs = [...logs].sort(
		(a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
	);
</script>

<Popover.Root>
	<Popover.Trigger asChild let:builder>
		<Button variant="ghost" size="sm" class="h-8 w-8 p-0" builders={[builder]}>
			<History class="h-4 w-4" />
			<span class="sr-only">View logs</span>
		</Button>
	</Popover.Trigger>
	<Popover.Content class="w-[400px] p-0" align="end">
		<div class="p-4">
			<h4 class="mb-2 font-medium leading-none">Webhook Logs</h4>
			{#if sortedLogs.length === 0}
				<p class="text-sm text-muted-foreground">No logs available</p>
			{:else}
				<ScrollArea class="h-[300px]">
					<div class="space-y-4">
						{#each sortedLogs as log}
							<div class="flex flex-col space-y-1 border-b pb-2 last:border-0">
								<div class="flex items-center justify-between">
									<Badge
										variant={log.status === 'success' ? 'default' : 'destructive'}
										class="capitalize"
									>
										{log.status}
									</Badge>
									<span class="text-xs text-muted-foreground">
										{formatDate(log.timestamp)}
									</span>
								</div>
								<div class="text-sm">
									<span class="font-medium">Event:</span>
									{log.event}
								</div>
								{#if log.retries > 0}
									<div class="text-sm text-muted-foreground">
										Retries: {log.retries}
									</div>
								{/if}
								<div class="text-sm">
									<span class="font-medium">Response:</span>
									<pre
										class={cn(
											'mt-1 rounded bg-muted p-2 font-mono text-xs',
											log.status === 'failed' && 'text-destructive'
										)}>{log.response}</pre>
								</div>
							</div>
						{/each}
					</div>
				</ScrollArea>
			{/if}
		</div>
	</Popover.Content>
</Popover.Root>

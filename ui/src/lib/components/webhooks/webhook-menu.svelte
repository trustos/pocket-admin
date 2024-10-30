<script lang="ts">
	import * as DropdownMenu from '$lib/shadcn/components/ui/dropdown-menu';
	import { Button } from '$lib/shadcn/components/ui/button';
	import Pencil from 'lucide-svelte/icons/pencil';
	import type { WebhookEntry } from '$lib/types';

	export let webhook: WebhookEntry;
	export let onEdit: (webhook: WebhookEntry) => void;
	export let onDelete: (webhook: WebhookEntry) => void;
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button variant="ghost" size="icon" builders={[builder]}>
			<Pencil class="h-4 w-4" />
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content>
		<DropdownMenu.Item on:click={() => onEdit(webhook)}>Edit</DropdownMenu.Item>
		<DropdownMenu.Separator />
		<DropdownMenu.Item
			class="text-destructive focus:text-destructive"
			on:click={() => onDelete(webhook)}
		>
			Delete
		</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>

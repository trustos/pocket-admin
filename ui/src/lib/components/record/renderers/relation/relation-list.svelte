<script lang="ts">
	import { Button } from '$lib/shadcn/components/ui/button';
	// import type { Relation } from './types';

	interface Relation {
		id: string;
		name: string;
	}

	export let relations: Relation[];
	export let onRemove: (relation: Relation) => void;
</script>

<ul class="space-y-2">
	{#each relations as relation (relation.id)}
		<li class="flex items-center justify-between rounded bg-secondary p-2">
			<span>{relation.name}</span>
			<Button variant="ghost" size="icon" on:click={() => onRemove(relation)}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="h-4 w-4"
					><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"
					></line></svg
				>
				<span class="sr-only">Remove</span>
			</Button>
		</li>
	{/each}
</ul>

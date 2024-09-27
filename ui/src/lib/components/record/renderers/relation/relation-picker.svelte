<script lang="ts">
	import { Button } from '$lib/shadcn/components/ui/button';
	import {
		Dialog,
		DialogContent,
		DialogHeader,
		DialogTitle,
		DialogDescription,
		DialogFooter
	} from '$lib/shadcn/components/ui/dialog';
	import { Input } from '$lib/shadcn/components/ui/input';
	import { Label } from '$lib/shadcn/components/ui/label';
	import { onMount } from 'svelte';
	import RelationList from './relation-list.svelte';
	import type { RecordModel } from 'pocketbase';
	// import type { Relation } from './types';

	interface Relation {
		id: string;
		name: string;
	}

	export let selectedRelations: RecordModel[] = [];
	export let allRelations: Relation[] = [];
	let dialogOpen = false;
	let tempSelectedRelations: Relation[] = [];

	onMount(async () => {
		// Fetch relations from Pocketbase
		// This is a placeholder. Replace with actual Pocketbase fetch logic
		allRelations = await fetchRelationsFromPocketbase();
	});

	function openDialog() {
		tempSelectedRelations = [...selectedRelations];
		dialogOpen = true;
	}

	function closeDialog() {
		dialogOpen = false;
	}

	function confirmSelection() {
		selectedRelations = [...tempSelectedRelations];
		closeDialog();
	}

	function toggleRelation(relation: Relation) {
		const index = tempSelectedRelations.findIndex((r) => r.id === relation.id);
		if (index > -1) {
			tempSelectedRelations.splice(index, 1);
		} else {
			tempSelectedRelations.push(relation);
		}
		tempSelectedRelations = tempSelectedRelations;
	}

	function removeRelation(relation: Relation) {
		selectedRelations = selectedRelations.filter((r) => r.id !== relation.id);
	}

	async function fetchRelationsFromPocketbase() {
		// Implement your Pocketbase fetch logic here
		// This is just a placeholder
		return [
			{ id: '1', name: 'Relation 1' },
			{ id: '2', name: 'Relation 2' },
			{ id: '3', name: 'Relation 3' }
		];
	}
</script>

<div>
	<Label for="relations">Selected Relations</Label>
	<RelationList relations={selectedRelations} onRemove={removeRelation} />
	<Button on:click={openDialog}>Pick Relations</Button>
	<Input type="hidden" name="relations" value={selectedRelations.map((r) => r.id).join(',')} />
</div>

<Dialog bind:open={dialogOpen}>
	<DialogContent>
		<DialogHeader>
			<DialogTitle>Select Relations</DialogTitle>
			<DialogDescription>Choose the relations you want to add.</DialogDescription>
		</DialogHeader>
		<div class="grid gap-4 py-4">
			{#each allRelations as relation}
				<div class="flex items-center space-x-2">
					<Input
						type="checkbox"
						id={relation.id}
						checked={tempSelectedRelations.some((r) => r.id === relation.id)}
						on:change={() => toggleRelation(relation)}
					/>
					<Label for={relation.id}>{relation.name}</Label>
				</div>
			{/each}
		</div>
		<DialogFooter>
			<Button on:click={closeDialog} variant="outline">Cancel</Button>
			<Button on:click={confirmSelection}>Confirm</Button>
		</DialogFooter>
	</DialogContent>
</Dialog>

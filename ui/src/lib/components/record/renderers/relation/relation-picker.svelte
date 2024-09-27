<script lang="ts">
	import { createEventDispatcher } from 'svelte';
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
	import { RadioGroup, RadioGroupItem } from '$lib/shadcn/components/ui/radio-group';
	import { Checkbox } from '$lib/shadcn/components/ui/checkbox';
	import { onMount } from 'svelte';
	import RelationList from './relation-list.svelte';
	import type { RecordModel } from 'pocketbase';
	import pb from '$lib/pocketbase';
	import { getRelationName } from '$lib/helpers';

	export let selectedRelations: RecordModel[] = [];
	selectedRelations = selectedRelations.map((r) => ({ ...r, name: getRelationName(r) }));

	export let allRelations: RecordModel[] = [];
	export let singleRelation: boolean;
	export let pickerCollectionId: string | undefined;

	console.log(singleRelation);

	let dialogOpen = false;
	let tempSelectedRelations: RecordModel[] = [];
	let hiddenInputValue = '';
	let searchQuery = '';
	let selectedRadioValue = '';

	const dispatch = createEventDispatcher();

	onMount(async () => {
		if (pickerCollectionId) {
			allRelations = await fetchRelationsFromPocketbase(pickerCollectionId);
		}

		if (singleRelation && selectedRelations.length > 0) {
			selectedRadioValue = selectedRelations[0].id;
		}
	});

	function openDialog() {
		tempSelectedRelations = [...selectedRelations];
		if (singleRelation && tempSelectedRelations.length > 0) {
			selectedRadioValue = tempSelectedRelations[0].id;
		}
		dialogOpen = true;
	}

	function closeDialog() {
		dialogOpen = false;
		searchQuery = '';
	}

	function confirmSelection() {
		if (singleRelation) {
			selectedRelations = allRelations.filter((r) => r.id === selectedRadioValue);
		} else {
			selectedRelations = [...tempSelectedRelations];
		}
		dispatchChange();
		closeDialog();
	}

	function dispatchChange() {
		dispatch('change', { selectedRelations });
	}

	function toggleRelation(relation: RecordModel) {
		if (singleRelation) {
			selectedRadioValue = relation.id;
		} else {
			const index = tempSelectedRelations.findIndex((r) => r.id === relation.id);
			if (index > -1) {
				tempSelectedRelations.splice(index, 1);
			} else {
				tempSelectedRelations.push(relation);
			}
			tempSelectedRelations = tempSelectedRelations;
		}
	}

	function removeRelation(relation: RecordModel) {
		selectedRelations = selectedRelations.filter((r) => r.id !== relation.id);
		dispatchChange();
	}

	async function fetchRelationsFromPocketbase(collectionId: string) {
		const collection = await pb.collection(collectionId).getFullList();
		return collection || [];
	}

	$: filteredRelations = allRelations.filter((relation) =>
		Object.values(relation).some((value) =>
			String(value).toLowerCase().includes(searchQuery.toLowerCase())
		)
	);

	$: {
		hiddenInputValue = selectedRelations.map((r) => r.id).join(',');
	}
</script>

<div>
	{#if selectedRelations.length}
		<RelationList relations={selectedRelations} onRemove={removeRelation} />
	{/if}

	<Button class="mt-2" on:click={openDialog}>Open Picker</Button>
	<Input type="hidden" value={hiddenInputValue} />
</div>

<Dialog bind:open={dialogOpen}>
	<DialogContent class="sm:max-w-[425px]">
		<DialogHeader>
			<DialogTitle class="font-normal"
				>Select <b>{allRelations[0].collectionName}</b>
				{singleRelation ? 'record' : 'records'}</DialogTitle
			>
			<DialogDescription
				>Choose the {singleRelation ? 'record' : 'records'} you want to add.</DialogDescription
			>
		</DialogHeader>
		<div class="grid gap-4 py-4">
			<Input type="search" placeholder="Filter records..." bind:value={searchQuery} />
			{#if singleRelation}
				<RadioGroup bind:value={selectedRadioValue}>
					{#each filteredRelations as relation (relation.id)}
						<div class="flex items-center space-x-2">
							<RadioGroupItem value={relation.id} id={relation.id} />
							<Label for={relation.id}>{getRelationName(relation)}</Label>
						</div>
					{/each}
				</RadioGroup>
			{:else}
				{#each filteredRelations as relation (relation.id)}
					<div class="flex items-center space-x-2">
						<Checkbox
							id={relation.id}
							checked={tempSelectedRelations.some((r) => r.id === relation.id)}
							onCheckedChange={() => toggleRelation(relation)}
						/>
						<Label for={relation.id}>{getRelationName(relation)}</Label>
					</div>
				{/each}
			{/if}
		</div>
		<DialogFooter>
			<Button on:click={closeDialog} variant="outline">Cancel</Button>
			<Button on:click={confirmSelection}>Confirm</Button>
		</DialogFooter>
	</DialogContent>
</Dialog>

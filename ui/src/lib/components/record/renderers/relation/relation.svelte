<script lang="ts">
	import type { RecordModel } from 'pocketbase';
	import RelationPicker from '$lib/components/record/renderers/relation/relation-picker.svelte';
	import type { SchemaField } from '$lib/types';

	export let attrs: Record<string, unknown>;
	export let value: string | string[];
	export let record: RecordModel | undefined;
	export let options: SchemaField['options'];

	let singleRelation = options?.maxSelect != null && options.maxSelect <= 1;

	const getValue = (record: RecordModel | undefined, name: string) => {
		const result = record?.expand && (record?.expand[name as keyof RecordModel] as RecordModel);

		if (!result) {
			return [];
		}

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

	const callbackRelationChange = (e: CustomEvent<{ selectedRelations: RecordModel[] }>) => {
		value = e.detail.selectedRelations.map((r) => r.id);
	};
</script>

<RelationPicker
	{singleRelation}
	pickerCollectionId={options?.collectionId}
	on:change={callbackRelationChange}
	selectedRelations={relations.map((r) => r.record)}
/>

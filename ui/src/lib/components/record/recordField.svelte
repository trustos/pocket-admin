<script lang="ts">
	import {
		CommonRenderer,
		TextRenderer,
		FileRenderer,
		NumberRenderer,
		BoolRenderer,
		EmailRenderer,
		UrlRenderer,
		DateRenderer,
		SelectRenderer,
		RelationRenderer
	} from '$lib/components/record/renderers';
	import type { RecordModel } from 'pocketbase';

	import type { Collection, SchemaField } from '$lib/types';
	import type { SuperForm } from 'sveltekit-superforms';
	import Number from '../table/renderers/number.svelte';

	export let type: string;
	// export let value: number | string | boolean | string[] | Collection | unknown;
	// export let name: string;
	// export let record: Collection;

	// export let fieldName: string;
	// 	export let icon: (typeof fieldIcons)[keyof typeof fieldIcons];
	export let attrs: Record<string, unknown>;
	export let value: RecordModel[keyof RecordModel];
	export let record: RecordModel;
	export let options: SchemaField['options'];
	export let form: SuperForm<RecordModel, RecordModel>;

	// Type guards
	function isString(value: unknown): value is string {
		return typeof value === 'string';
	}

	function isNumber(value: unknown): value is number {
		return typeof value === 'number';
	}

	function isBoolean(value: unknown): value is boolean {
		return typeof value === 'boolean';
	}

	function isStringArray(value: unknown): value is string[] {
		return Array.isArray(value);
	}
</script>

<!-- Use the type guard directly in the if-block to ensure TypeScript narrows the type properly -->
{#if type === 'text' && isString(value)}
	<TextRenderer {attrs} bind:value />
{:else if type === 'file'}
	<FileRenderer {options} {form} bind:value {attrs} {record} />
	<!-- {:else if type === 'editor' && isString(value)}
	<EditorRenderer {value} /> -->
{:else if type === 'email' && isString(value)}
	<EmailRenderer {attrs} bind:value />
{:else if type === 'url' && isString(value)}
	<UrlRenderer {attrs} bind:value />
{:else if type === 'number'}
	<NumberRenderer {attrs} bind:value />
	<!-- {:else if type === 'id' && isString(value)}
	<IdRenderer {value} /> -->
{:else if type === 'bool' && isBoolean(value)}
	<BoolRenderer {attrs} bind:value />
{:else if type === 'date' && isString(value)}
	<DateRenderer {attrs} bind:value />
{:else if type === 'select' && (isString(value) || isStringArray(value))}
	<SelectRenderer {options} {attrs} bind:value />
{:else if type === 'relation' && (isString(value) || isStringArray(value))}
	<RelationRenderer {options} {record} {attrs} bind:value />
	<!-- {:else if type === 'json' && isString(value)}
	<JsonRenderer {value} /> -->
{:else}
	<CommonRenderer bind:value {attrs} />
{/if}

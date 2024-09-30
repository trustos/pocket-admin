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
		RelationRenderer,
		JsonRenderer,
		EditorRenderer
	} from '$lib/components/record/renderers';
	import type { RecordModel } from 'pocketbase';

	import type { SchemaField } from '$lib/types';
	import type { SuperForm } from 'sveltekit-superforms';

	export let type: string;
	export let attrs: Record<string, unknown>;
	export let value: RecordModel[keyof RecordModel];
	export let record: RecordModel | undefined;
	export let options: SchemaField['options'];
	export let form: SuperForm<{ [x: string]: unknown }>;
</script>

<!-- Use the type guard directly in the if-block to ensure TypeScript narrows the type properly -->
{#if type === 'text'}
	<TextRenderer {attrs} bind:value />
{:else if type === 'file'}
	<FileRenderer {options} {form} bind:value {attrs} {record} />
{:else if type === 'editor'}
	<EditorRenderer bind:value />
{:else if type === 'email'}
	<EmailRenderer {attrs} bind:value />
{:else if type === 'url'}
	<UrlRenderer {attrs} bind:value />
{:else if type === 'number'}
	<NumberRenderer {attrs} bind:value />
{:else if type === 'bool'}
	<BoolRenderer {attrs} bind:value />
{:else if type === 'date'}
	<DateRenderer {attrs} bind:value />
{:else if type === 'select'}
	<SelectRenderer {options} {attrs} bind:value />
{:else if type === 'relation'}
	<RelationRenderer {options} {record} {attrs} bind:value />
{:else if type === 'json'}
	<JsonRenderer bind:value />
{:else}
	<CommonRenderer bind:value {attrs} />
{/if}

<script lang="ts">
	import {
		TextRenderer,
		EditorRenderer,
		EmailRenderer,
		UrlRenderer,
		FileRenderer,
		NumberRenderer,
		BoolRenderer,
		DateRenderer,
		SelectRenderer,
		RelationRenderer,
		JsonRenderer,
		IdRenderer
	} from '$lib/components/table/renderers';

	import type { Collection } from '$lib/types';

	export let type: string;
	export let value: number | string | boolean | string[] | Collection | unknown;
	export let name: string;
	export let record: Collection;

	// Type guards
	const isString = (value: unknown): value is string => {
		return typeof value === 'string';
	};

	const isNumber = (value: unknown): value is number => {
		return typeof value === 'number';
	};

	const isBoolean = (value: unknown): value is boolean => {
		return typeof value === 'boolean';
	};

	const isStringArray = (value: unknown): value is string[] => {
		return Array.isArray(value) && value.every((item) => typeof item === 'string');
	};
</script>

<!-- Use the type guard directly in the if-block to ensure TypeScript narrows the type properly -->
{#if type === 'text' && isString(value)}
	<TextRenderer {value} />
{:else if type === 'editor' && isString(value)}
	<EditorRenderer {value} />
{:else if type === 'email' && isString(value)}
	<EmailRenderer {value} />
{:else if type === 'url' && isString(value)}
	<UrlRenderer {value} />
{:else if type === 'file' && (isStringArray(value) || isString(value))}
	<FileRenderer {value} collection={record} />
{:else if type === 'number' && isNumber(value)}
	<NumberRenderer {value} />
{:else if type === 'id' && isString(value)}
	<IdRenderer {value} />
{:else if type === 'bool' && isBoolean(value)}
	<BoolRenderer {value} />
{:else if type === 'date' && isString(value)}
	<DateRenderer {value} />
{:else if type === 'select' && (isString(value) || isStringArray(value))}
	<SelectRenderer {value} />
{:else if type === 'relation' && (isString(value) || isStringArray(value))}
	<RelationRenderer {value} {record} fieldName={name} />
{:else if type === 'json' && isString(value)}
	<JsonRenderer {value} />
{:else}
	<span>{JSON.stringify(value)}</span>
{/if}

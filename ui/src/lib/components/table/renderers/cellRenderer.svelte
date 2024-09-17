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

	export let name: string;
	export let type: string;
	export let record: Collection;

	// Get value from the record based on the field name
	function getValue(record: Collection, name: string): unknown {
		return record[name as keyof Collection];
	}

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
		return Array.isArray(value) && value.every((item) => typeof item === 'string');
	}

	$: value = getValue(record, name);
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
{:else if type === 'file' && isStringArray(value)}
	<FileRenderer {value} collection={record} />
{:else if type === 'number' && isNumber(value)}
	<NumberRenderer {value} />
{:else if type === 'id' && isString(value)}
	<IdRenderer {value} />
{:else if type === 'bool' && isBoolean(value)}
	<BoolRenderer {value} />
{:else if type === 'date' && isString(value)}
	<DateRenderer {value} />
{:else if type === 'select' && isString(value)}
	<SelectRenderer {value} />
{:else if type === 'relation' && (isString(value) || isStringArray(value))}
	<RelationRenderer {value} {record} fieldName={name} />
{:else}
	<span>{JSON.stringify(value)}</span>
{/if}

<!-- #if type === 'text' && isString(getValue(record, name))}
  <TextRenderer value={getValue(record, name) as string} />
{:else if type === 'editor' && isString(getValue(record, name))}
  <EditorRenderer value={getValue(record, name) as string} />
{:else if type === 'email' && isString(getValue(record, name))}
  <EmailRenderer value={getValue(record, name) as string} />
{:else if type === 'url' && isString(getValue(record, name))}
  <UrlRenderer value={getValue(record, name) as string} />
{:else if type === 'file'}
  <FileRenderer value={getValue(record, name)} collection={record} />
{:else if type === 'number' && isNumber(getValue(record, name))}
  <NumberRenderer value={getValue(record, name) as number} />
{:else if type === 'id' && isString(getValue(record, name))}
  <IdRenderer value={getValue(record, name) as string} />
{:else}
  <span>{getValue(record, name)}</span>
{/if} -->

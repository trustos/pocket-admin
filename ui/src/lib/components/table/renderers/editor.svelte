<script lang="ts">
	import Common from '$lib/components/table/renderers/common.svelte';
	import NotAvailable from '$lib/components/table/renderers/notAvailable.svelte';
	import * as Tooltip from '$lib/shadcn/components/ui/tooltip';
	import EditorPreview from '$lib/components/table/renderers/editor-preview.svelte';

	export let value: string;

	function stripHTML(htmlString: string): string {
		// Create a new DOM parser
		const parser = new DOMParser();

		// Parse the HTML string into a DOM object
		const doc = parser.parseFromString(htmlString, 'text/html');

		// Extract and return the text content from the DOM object
		return doc.body.textContent || '';
	}

	function getPreviewText(text: string, maxLines: number): string {
		// Split the text into lines
		const lines = text.split(' ').filter((line) => line.trim() !== '');

		// Join the first few lines into a preview
		let result = lines.slice(0, maxLines).join(' ');

		// Add ellipsis if there are more lines
		if (lines.length > maxLines) {
			result += '...';
		}

		return result;
	}

	// Strip HTML
	const textContent = stripHTML(value);

	// Limit to first 3 lines for preview
	$: preview = getPreviewText(textContent, 5);
</script>

{#if value}
	<Tooltip.Root openDelay={100} open={true}>
		<Tooltip.Trigger asChild={false} let:builder>
			<div class="max-w-sm" {...builder}>
				{preview}
			</div>
			<!-- <a href={`${base}${item.href}`} class={classes()} use:builder.action {...builder}>
			<svelte:component
				this={item.icon}
				class={isActive ? ' h-4 w-4 group-hover:scale-110' : 'h-5 w-5'}
			/>
			<span class="sr-only">{item.name || ''}</span>
		</a> -->
		</Tooltip.Trigger>
		<Tooltip.Content side="right" class="overflow-auto border-2 bg-card">
			<EditorPreview {value} />
		</Tooltip.Content>
	</Tooltip.Root>
	<!-- <Common value={preview} /> -->
{:else}
	<NotAvailable />
{/if}

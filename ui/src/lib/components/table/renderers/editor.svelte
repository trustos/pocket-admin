<script lang="ts">
	import Common from './common.svelte';

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
	$: preview = getPreviewText(textContent, 20);
</script>

<Common value={preview} classes="w-64 block" />

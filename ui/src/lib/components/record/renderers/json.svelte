<script lang="ts">
	import { Button } from '$lib/shadcn/components/ui/button';
	import {
		Collapsible,
		CollapsibleContent,
		CollapsibleTrigger
	} from '$lib/shadcn/components/ui/collapsible';
	import type { RecordModel } from 'pocketbase';
	import { onMount } from 'svelte';
	import hljs from 'highlight.js/lib/core';
	import json from 'highlight.js/lib/languages/json';

	export let value: RecordModel[keyof RecordModel];

	let editorContent = '';
	let isValid = true;
	let isOpen = true;
	let editor: HTMLPreElement;

	hljs.registerLanguage('json', json);

	// Initialize editorContent
	$: {
		let initialValue = value;
		if (typeof initialValue === 'string') {
			try {
				initialValue = JSON.parse(initialValue);
			} catch {
				// If parsing fails, keep the original value
			}
		}
		editorContent = JSON.stringify(initialValue, null, 2);
	}

	function parseAndValidate(input: string): void {
		if (!input.trim()) {
			value = null;
			isValid = true;
			editorContent = input;
			return;
		}

		try {
			let parsed = JSON.parse(input);
			// Check if the parsed result is a string and try to parse it again

			if (typeof parsed === 'string') {
				try {
					parsed = JSON.parse(parsed);
				} catch {
					// If it fails to parse again, keep the original parsed value
				}
			}
			value = parsed as RecordModel[keyof RecordModel];
			isValid = true;
			editorContent = JSON.stringify(parsed, null, 2);
		} catch {
			isValid = false;
		}
	}

	function onInput(): void {
		const content = editor.innerText;
		parseAndValidate(content);
	}

	function formatJson(): void {
		if (isValid) {
			editor.innerText = editorContent;
			highlightCode();
		}
	}

	function highlightCode(): void {
		const highlighted = hljs.highlight(editor.innerText, { language: 'json' }).value;
		editor.innerHTML = highlighted;
	}

	function toggleCollapsible(): void {
		isOpen = !isOpen;
		if (isOpen) {
			// Update editor content when opened
			setTimeout(() => {
				if (editor) {
					editor.innerText = editorContent;
					highlightCode();
				}
			});
		}
	}

	onMount(() => {
		if (editor) {
			editor.innerText = editorContent;
			highlightCode();
		}
	});
</script>

<div class="space-y-2">
	<Collapsible open={isOpen}>
		<CollapsibleTrigger asChild>
			<Button variant="outline" size="sm" class="mb-2" on:click={toggleCollapsible}>
				{isOpen ? 'Hide' : 'Show'} JSON Editor
			</Button>
		</CollapsibleTrigger>
		<CollapsibleContent>
			<div class="relative">
				<pre
					bind:this={editor}
					contenteditable="true"
					class="hljs json rounded-md border p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
					on:input={onInput}
					on:blur={formatJson}></pre>
				{#if !isValid}
					<p class="absolute right-0 top-0 m-2 text-red-500">Invalid JSON</p>
				{/if}
			</div>
		</CollapsibleContent>
	</Collapsible>
</div>

<style>
	@import 'highlight.js/styles/github.css';

	pre {
		white-space: pre-wrap;
		word-wrap: break-word;
	}

	:global(.hljs-attr) {
		color: #0550ae;
	}
	:global(.hljs-string) {
		color: #690;
	}
	:global(.hljs-number) {
		color: #905;
	}
	:global(.hljs-literal) {
		color: #219;
	}
</style>

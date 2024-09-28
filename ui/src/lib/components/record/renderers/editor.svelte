<script lang="ts">
	import type { RecordModel } from 'pocketbase';

	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import TextAlign from '@tiptap/extension-text-align';

	import Image from '@tiptap/extension-image';
	import { Button } from '$lib/shadcn/components/ui/button';
	import { ToggleGroup, ToggleGroupItem } from '$lib/shadcn/components/ui/toggle-group';
	import {
		DropdownMenu,
		DropdownMenuContent,
		DropdownMenuItem,
		DropdownMenuTrigger
	} from '$lib/shadcn/components/ui/dropdown-menu';
	import {
		Dialog,
		DialogContent,
		DialogDescription,
		DialogHeader,
		DialogTitle,
		DialogTrigger
	} from '$lib/shadcn/components/ui/dialog';
	import { Input } from '$lib/shadcn/components/ui/input';
	import { Label } from '$lib/shadcn/components/ui/label';
	import {
		AlignLeft,
		AlignCenter,
		AlignRight,
		Bold,
		Italic,
		List,
		ListOrdered,
		Link,
		Image as ImageIcon,
		Table,
		Code,
		Maximize2
	} from 'lucide-svelte';

	let editor: Editor;

	const decodedContent = (encodedContent: string) =>
		decodeURIComponent(encodedContent.replace(/\+/g, ' '));

	onMount(() => {
		editor = new Editor({
			element: document.querySelector('#editor')!,
			extensions: [
				StarterKit.configure({
					// Disable an included extension
					// history: true,

					// Configure an included extension
					heading: {
						levels: [1, 2, 3, 4, 5, 6]
					}
				}),
				TextAlign.configure({
					types: ['heading', 'paragraph']
				}),
				Image
			],
			content: decodedContent(value),
			onUpdate: ({ editor }) => {
				// Handle content update
				value = editor.getHTML();
			}
		});
	});

	onDestroy(() => {
		if (editor) {
			editor.destroy();
		}
	});

	function toggleBold() {
		editor.chain().focus().toggleBold().run();
	}

	function toggleItalic() {
		editor.chain().focus().toggleItalic().run();
	}

	function setAlignment(alignment: 'left' | 'center' | 'right' | undefined) {
		if (alignment) {
			editor.commands.setTextAlign(alignment);
		}
	}

	function toggleList(type: 'bullet' | 'ordered') {
		if (type === 'bullet') {
			editor.chain().focus().toggleBulletList().run();
		} else {
			editor.chain().focus().toggleOrderedList().run();
		}
	}

	let linkUrl = '';
	let showLinkDialog = false;

	function openLinkDialog() {
		showLinkDialog = true;
	}

	function setLink() {
		if (linkUrl) {
			editor.chain().focus().setLink({ href: linkUrl }).run();
		}
		showLinkDialog = false;
		linkUrl = '';
	}

	function toggleFullscreen() {
		// Implement fullscreen toggle logic here
	}

	export let value: RecordModel[keyof RecordModel];

	const handleSetAlignment = (alignment: string | undefined) => {
		setAlignment(alignment as 'left' | 'center' | 'right' | undefined);
	};
</script>

<div class="rounded-md border border-gray-200 bg-muted p-4">
	<div class="mb-4 flex flex-wrap gap-2">
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Button variant="outline">Headings</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				{#each Array(6) as _, i}
					<DropdownMenuItem
						on:click={() =>
							editor
								.chain()
								.focus()
								.toggleHeading({ level: i + 1 })
								.run()}
					>
						Heading {i + 1}
					</DropdownMenuItem>
				{/each}
			</DropdownMenuContent>
		</DropdownMenu>

		<ToggleGroup variant="outline" type="single" onValueChange={handleSetAlignment}>
			<ToggleGroupItem class="bg-card" value="left" aria-label="Align left">
				<AlignLeft class="h-4 w-4" />
			</ToggleGroupItem>
			<ToggleGroupItem class="bg-card" value="center" aria-label="Align center">
				<AlignCenter class="h-4 w-4" />
			</ToggleGroupItem>
			<ToggleGroupItem class="bg-card" value="right" aria-label="Align right">
				<AlignRight class="h-4 w-4" />
			</ToggleGroupItem>
		</ToggleGroup>

		<ToggleGroup type="multiple" variant="outline">
			<ToggleGroupItem value="bold" aria-label="Toggle bold" on:click={toggleBold}>
				<Bold class="h-4 w-4" />
			</ToggleGroupItem>
			<ToggleGroupItem value="italic" aria-label="Toggle italic" on:click={toggleItalic}>
				<Italic class="h-4 w-4" />
			</ToggleGroupItem>
		</ToggleGroup>

		<ToggleGroup type="single">
			<ToggleGroupItem
				value="bullet"
				aria-label="Bullet list"
				on:click={() => toggleList('bullet')}
			>
				<List class="h-4 w-4" />
			</ToggleGroupItem>
			<ToggleGroupItem
				value="ordered"
				aria-label="Numbered list"
				on:click={() => toggleList('ordered')}
			>
				<ListOrdered class="h-4 w-4" />
			</ToggleGroupItem>
		</ToggleGroup>

		<Button variant="outline" on:click={openLinkDialog}>
			<Link class="mr-2 h-4 w-4" />
			Insert Link
		</Button>

		<Button variant="outline">
			<ImageIcon class="mr-2 h-4 w-4" />
			Insert Image
		</Button>

		<Button variant="outline">
			<Table class="mr-2 h-4 w-4" />
			Insert Table
		</Button>

		<Button variant="outline">
			<Code class="mr-2 h-4 w-4" />
			Insert Code
		</Button>

		<Button variant="outline" on:click={toggleFullscreen}>
			<Maximize2 class="h-4 w-4" />
		</Button>
	</div>

	<div id="editor" class="prose max-w-none bg-card"></div>
</div>

<Dialog bind:open={showLinkDialog}>
	<DialogContent>
		<DialogHeader>
			<DialogTitle>Insert Link</DialogTitle>
			<DialogDescription>Enter the URL for the link</DialogDescription>
		</DialogHeader>
		<div class="grid gap-4 py-4">
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="link-url" class="text-right">URL</Label>
				<Input id="link-url" bind:value={linkUrl} class="col-span-3" />
			</div>
		</div>
		<Button on:click={setLink}>Insert Link</Button>
	</DialogContent>
</Dialog>

<style>
	:global(.ProseMirror) {
		@apply border-[1px] border-dashed border-[muted] p-2;
	}
</style>

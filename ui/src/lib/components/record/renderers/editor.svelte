<script lang="ts">
	import type { RecordModel } from 'pocketbase';

	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import TextAlign from '@tiptap/extension-text-align';
	import Image from '@tiptap/extension-image';
	import Table from '@tiptap/extension-table';
	import TableRow from '@tiptap/extension-table-row';
	import TableCell from '@tiptap/extension-table-cell';
	import TableHeader from '@tiptap/extension-table-header';
	import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
	import Underline from '@tiptap/extension-underline';
	import Strike from '@tiptap/extension-strike';
	import Link from '@tiptap/extension-link';
	import { BubbleMenu } from '@tiptap/extension-bubble-menu';
	import { BubbleMenuPlugin } from '@tiptap/extension-bubble-menu';
	import { common, createLowlight } from 'lowlight';
	const lowlight = createLowlight(common);

	import { Button } from '$lib/shadcn/components/ui/button';
	import { Separator } from '$lib/shadcn/components/ui/separator';
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
		DialogTitle
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
		Link as LinkIcon,
		Image as ImageIcon,
		Table as TableIcon,
		Code,
		Maximize2,
		Underline as UnderlineIcon,
		Strikethrough
	} from 'lucide-svelte';
	import { Tooltip } from '$lib/components/common';

	let editor: Editor;
	let isFullscreen = false;
	let showLinkDialog = false;
	let showImageDialog = false;
	let linkUrl = '';

	onMount(() => {
		editor = new Editor({
			element: document.querySelector('#editor')!,
			editorProps: {
				attributes: {
					class:
						// 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none max-w-none overflow-auto bg-card'
						'prose max-w-none overflow-auto bg-card focus:outline-none'
					// class="prose max-w-none overflow-auto bg-card"
				}
			},
			extensions: [
				StarterKit.configure({
					codeBlock: false, // Disable the default CodeBlock
					strike: false, // Disable the default Strike
					heading: {
						levels: [1, 2, 3, 4, 5, 6]
					}
				}),
				TextAlign.configure({
					types: [
						'heading',
						'paragraph',
						'image',
						'tableCell',
						'tableHeader',
						'tableRow',
						'codeBlock',
						'link',
						'listItem',
						'blockquote',
						'horizontalRule',
						'table'
					]
				}),
				Image.configure({
					inline: true,
					allowBase64: true
				}),
				Table.configure({
					resizable: true
				}),
				TableRow,
				TableCell,
				TableHeader,
				CodeBlockLowlight.configure({
					lowlight
				}),
				Link,
				Underline,
				Strike,
				BubbleMenu.configure({
					element: document.querySelector('.bubble-menu')!
				})
			],
			content: value,
			onUpdate: ({ editor }) => {
				value = editor.getHTML();

				activeHeading = editor.isActive('heading')
					? `h${editor.getAttributes('heading').level}`
					: null;

				updateActiveStates();
			},
			onSelectionUpdate: () => {
				updateActiveStates();
			}
		});

		editor.on('selectionUpdate', () => {
			activeHeading = editor.isActive('heading')
				? `h${editor.getAttributes('heading').level}`
				: null;

			updateActiveStates();
		});
	});

	onDestroy(() => {
		if (editor) {
			editor.off('selectionUpdate', updateActiveStates);
			editor.off('update', updateActiveStates);
			editor.destroy();
		}
	});

	function updateActiveStates() {
		if (editor) {
			activeToggles = {
				bold: editor.isActive('bold'),
				italic: editor.isActive('italic'),
				underline: editor.isActive('underline'),
				strike: editor.isActive('strike'),
				bulletList: editor.isActive('bulletList'),
				orderedList: editor.isActive('orderedList')
			};

			activeAlignment = editor.isActive({ textAlign: 'left' })
				? 'left'
				: editor.isActive({ textAlign: 'center' })
					? 'center'
					: editor.isActive({ textAlign: 'right' })
						? 'right'
						: undefined;
		}
	}

	function setAlignment(alignment: string | undefined) {
		if (alignment === 'left' || alignment === 'center' || alignment === 'right') {
			editor.chain().focus().setTextAlign(alignment).run();
		}
	}

	// function toggleList(type: 'bullet' | 'ordered') {
	// 	if (type === 'bullet') {
	// 		if (editor.isActive('bulletList')) {
	// 			editor.chain().focus().liftListItem('listItem').run();
	// 		} else {
	// 			editor.chain().focus().toggleBulletList().run();
	// 		}
	// 	} else {
	// 		if (editor.isActive('orderedList')) {
	// 			editor.chain().focus().liftListItem('listItem').run();
	// 		} else {
	// 			editor.chain().focus().toggleOrderedList().run();
	// 		}
	// 	}
	// 	updateActiveStates();
	// }

	function handleListChange(values: string[]) {
		const hasBullet = values.includes('bullet');
		const hasOrdered = values.includes('ordered');

		if (hasBullet && !hasOrdered) {
			editor.chain().focus().toggleBulletList().run();
		} else if (hasOrdered && !hasBullet) {
			editor.chain().focus().toggleOrderedList().run();
		} else if (!hasBullet && !hasOrdered) {
			// If neither is selected, lift the list items
			editor.chain().focus().liftListItem('listItem').run();
		}

		updateActiveStates();
	}

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
		isFullscreen = !isFullscreen;
		document.body.classList.toggle('overflow-hidden', isFullscreen);
	}

	function insertImage() {
		showImageDialog = true;
	}

	function handleImageUpload(event: Event) {
		const input = event.target as HTMLInputElement;
		const file = input.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {
				const result = e.target?.result as string;
				editor.chain().focus().setImage({ src: result }).run();
				showImageDialog = false;
			};
			reader.readAsDataURL(file);
		}
	}

	function insertTable() {
		editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
	}

	function insertCode() {
		editor.chain().focus().toggleCodeBlock().run();
	}

	function getHeadingLevel(num: number): 1 | 2 | 3 | 4 | 5 | 6 {
		if (num >= 1 && num <= 6) {
			return num as 1 | 2 | 3 | 4 | 5 | 6;
		}
		throw new Error('Invalid heading level');
	}

	const toggleHeading = (level: number) => {
		editor
			.chain()
			.focus()
			.toggleHeading({ level: getHeadingLevel(level) })
			.run();
	};

	function handleTextStyleChange(values: string[] | undefined) {
		if (!editor || !values) return;

		const styles = ['bold', 'italic', 'underline', 'strike'] as const;
		styles.forEach((style) => {
			const isActive = values.includes(style);
			switch (style) {
				case 'bold':
					if (isActive) editor.chain().focus().setBold().run();
					else editor.chain().focus().unsetBold().run();
					break;
				case 'italic':
					if (isActive) editor.chain().focus().setItalic().run();
					else editor.chain().focus().unsetItalic().run();
					break;
				case 'underline':
					if (isActive) editor.chain().focus().setUnderline().run();
					else editor.chain().focus().unsetUnderline().run();
					break;
				case 'strike':
					if (isActive) editor.chain().focus().setStrike().run();
					else editor.chain().focus().unsetStrike().run();
					break;
			}
		});

		updateActiveStates();
	}
	export let value: RecordModel[keyof RecordModel];

	$: activeToggles = {
		bold: editor?.isActive('bold') ?? false,
		italic: editor?.isActive('italic') ?? false,
		underline: editor?.isActive('underline') ?? false,
		strike: editor?.isActive('strike') ?? false,
		bulletList: editor?.isActive('bulletList') ?? false,
		orderedList: editor?.isActive('orderedList') ?? false
	};
	$: activeHeading = editor?.isActive('heading')
		? `h${editor.getAttributes('heading').level}`
		: null;

	$: activeAlignment = editor?.isActive({ textAlign: 'left' })
		? 'left'
		: editor?.isActive({ textAlign: 'center' })
			? 'center'
			: editor?.isActive({ textAlign: 'right' })
				? 'right'
				: undefined;
</script>

<div
	class="group/wrapper relative rounded-md border border-gray-200 bg-muted px-4 pb-4"
	class:fullscreen={isFullscreen}
>
	<div class="sticky top-0 z-10 bg-muted py-2 group-[:not(.fullscreen)]/wrapper:-top-[20px]">
		<div class="flex flex-wrap gap-1 p-2">
			<Tooltip text="Change heading level">
				<DropdownMenu>
					<DropdownMenuTrigger>
						<Button variant="outline">
							{activeHeading ? `Heading ${activeHeading.slice(1)}` : 'Headings'}
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						{#each Array(6) as _, i (i)}
							<DropdownMenuItem
								on:click={() => toggleHeading(i + 1)}
								class={`${activeHeading === `h${i + 1}` ? 'active' : ''}`}
							>
								Heading {i + 1}
							</DropdownMenuItem>
						{/each}
					</DropdownMenuContent>
				</DropdownMenu>
			</Tooltip>

			<Separator orientation="vertical" />

			<ToggleGroup
				variant="outline"
				type="single"
				value={activeAlignment}
				onValueChange={setAlignment}
			>
				<Tooltip text="Align left">
					<ToggleGroupItem class="bg-card" value="left" aria-label="Align left">
						<AlignLeft class="h-4 w-4" />
					</ToggleGroupItem>
				</Tooltip>
				<Tooltip text="Align center">
					<ToggleGroupItem class="bg-card" value="center" aria-label="Align center">
						<AlignCenter class="h-4 w-4" />
					</ToggleGroupItem>
				</Tooltip>
				<Tooltip text="Align right">
					<ToggleGroupItem class="bg-card" value="right" aria-label="Align right">
						<AlignRight class="h-4 w-4" />
					</ToggleGroupItem>
				</Tooltip>
			</ToggleGroup>

			<Separator orientation="vertical" />

			<ToggleGroup
				type="multiple"
				variant="outline"
				onValueChange={handleTextStyleChange}
				value={Object.entries(activeToggles)
					.filter(([_, isActive]) => isActive)
					.map(([style]) => style)}
			>
				<Tooltip text="Bold">
					<ToggleGroupItem class="bg-card" value="bold" aria-label="Toggle bold">
						<Bold class="h-4 w-4" />
					</ToggleGroupItem>
				</Tooltip>
				<Tooltip text="Toggle italic">
					<ToggleGroupItem class="bg-card" value="italic" aria-label="Toggle italic">
						<Italic class="h-4 w-4" />
					</ToggleGroupItem>
				</Tooltip>

				<Tooltip text="Toggle underline">
					<ToggleGroupItem class="bg-card" value="underline" aria-label="Toggle underline">
						<UnderlineIcon class="h-4 w-4" />
					</ToggleGroupItem>
				</Tooltip>

				<Tooltip text="Toggle strikethrough">
					<ToggleGroupItem class="bg-card" value="strike" aria-label="Toggle strikethrough">
						<Strikethrough class="h-4 w-4" />
					</ToggleGroupItem>
				</Tooltip>
			</ToggleGroup>

			<Separator orientation="vertical" />

			<ToggleGroup
				type="single"
				variant="outline"
				onValueChange={(value) => handleListChange(value ? [value] : [])}
				value={activeToggles.bulletList
					? 'bullet'
					: activeToggles.orderedList
						? 'ordered'
						: undefined}
			>
				<Tooltip text="Bullet list">
					<ToggleGroupItem class="bg-card" value="bullet" aria-label="Bullet list">
						<List class="h-4 w-4" />
					</ToggleGroupItem>
				</Tooltip>
				<Tooltip text="Numbered list">
					<ToggleGroupItem class="bg-card" value="ordered" aria-label="Numbered list">
						<ListOrdered class="h-4 w-4" />
					</ToggleGroupItem>
				</Tooltip>
			</ToggleGroup>

			<Separator orientation="vertical" />

			<Tooltip text="Insert link">
				<Button variant="outline" on:click={openLinkDialog}>
					<LinkIcon class="h-4 w-4" />
				</Button>
			</Tooltip>

			<Tooltip text="Insert Image">
				<Button variant="outline" on:click={insertImage}>
					<ImageIcon class="h-4 w-4" />
				</Button>
			</Tooltip>

			<Tooltip text="Insert Table">
				<Button variant="outline" on:click={insertTable}>
					<TableIcon class="h-4 w-4" />
				</Button>
			</Tooltip>

			<Tooltip text="Insert Code">
				<Button variant="outline" on:click={insertCode}>
					<Code class="h-4 w-4" />
				</Button>
			</Tooltip>

			<Tooltip text="Toggle fullscreen">
				<Button variant="outline" on:click={toggleFullscreen}>
					<Maximize2 class="h-4 w-4" />
				</Button>
			</Tooltip>
		</div>
	</div>
	<div id="editor" class="overflow-auto"></div>
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

<Dialog bind:open={showImageDialog}>
	<DialogContent>
		<DialogHeader>
			<DialogTitle>Upload Image</DialogTitle>
			<DialogDescription>Choose an image file to upload</DialogDescription>
		</DialogHeader>
		<div class="grid gap-4 py-4">
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="image-upload" class="text-right">Image</Label>
				<Input
					id="image-upload"
					type="file"
					accept="image/*"
					on:change={handleImageUpload}
					class="col-span-3"
				/>
			</div>
		</div>
	</DialogContent>
</Dialog>

<style>
	:global(.ProseMirror) {
		@apply p-2;

		& table {
			@apply table-auto;

			&:has(.column-resize-handle) {
				@apply cursor-col-resize;
			}

			& th {
				@apply relative border border-[card] bg-muted text-secondary-foreground;
			}
			& td {
				@apply relative border border-[muted] bg-card text-secondary-foreground;
			}

			& td,
			& th {
				&:has(.column-resize-handle)::after {
					@apply absolute -right-[1px] top-1/2 z-10 h-full w-[2px] -translate-y-1/2 transform bg-gray-300 content-[''];
				}
			}
		}
	}

	:global(.fullscreen) {
		@apply fixed inset-0 z-50 !mt-0 h-screen w-screen overflow-auto;
	}

	:global([data-vaul-drawer] .fullscreen) {
		/* @apply top-0; */
		@apply h-full w-full;
	}

	:global(*[data-toggle-group-item][data-state='on']) {
		@apply bg-primary text-primary-foreground;
	}

	:global(.active) {
		@apply bg-primary text-primary-foreground;
	}
</style>

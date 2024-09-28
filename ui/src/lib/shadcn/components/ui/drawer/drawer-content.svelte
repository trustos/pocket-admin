<script lang="ts">
	import { Drawer as DrawerPrimitive } from 'vaul-svelte';
	import DrawerOverlay from './drawer-overlay.svelte';
	import { cn } from '$lib/shadcn/utils.js';

	type $$Props = DrawerPrimitive.ContentProps;

	let className: $$Props['class'] = undefined;
	export { className as class };
</script>

<DrawerPrimitive.Portal>
	<DrawerOverlay />
	<DrawerPrimitive.Content
		class={cn(
			'fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background',
			className
		)}
		{...$$restProps}
	>
		<div
			tabindex="0"
			role="button"
			class="mx-auto mt-4 h-2 w-[100px] cursor-grab rounded-full bg-muted active:cursor-grabbing"
		></div>
		<slot />
	</DrawerPrimitive.Content>
</DrawerPrimitive.Portal>

<script lang="ts">
	import { cubicInOut } from 'svelte/easing';
	import { crossfade } from 'svelte/transition';
	import { cn } from '$lib/shadcn/utils';
	import { page } from '$app/stores';
	import { Button } from '$lib/shadcn/components/ui/button';
	import { comparePaths } from '$lib/helpers';
	import { base } from '$app/paths';

	let className: string | undefined | null = undefined;
	export let items: { href: string; title: string; icon: unknown }[];
	export { className as class };

	const [send, receive] = crossfade({
		duration: 250,
		easing: cubicInOut
	});

	$: isActive = (href: string) => comparePaths($page.url.pathname, href);
</script>

<nav class={cn('flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1', className)}>
	{#each items as item}
		<Button
			href={base + item.href}
			variant="ghost"
			class={cn('relative justify-start hover:bg-gray-200')}
			data-sveltekit-noscroll
		>
			{#if isActive(item.href)}
				<div
					class="absolute inset-0 rounded-md bg-gray-200"
					in:send={{ key: 'active-sidebar-tab' }}
					out:receive={{ key: 'active-sidebar-tab' }}
				/>
			{/if}
			<div class="relative">
				<svelte:component this={item.icon} class="inline w-5" />
				{item.title}
			</div>
		</Button>
	{/each}
</nav>

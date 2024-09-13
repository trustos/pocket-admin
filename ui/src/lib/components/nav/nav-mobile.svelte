<script lang="ts">
	import * as Sheet from '$lib/shadcn/components/ui/sheet';
	import { Button } from '$lib/shadcn/components/ui/button';
	import PanelLeft from 'lucide-svelte/icons/panel-left';

	import type { Menu } from '$lib/types';
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import { removeTrailingSlash } from '$lib/helpers';

	// $: isActive = (href: string) => $page.route.id == href;

	$: isActive = (href: string) =>
		removeTrailingSlash($page.url.pathname) == `${base}${href !== '/' ? href : ''}`;

	export let menu: Menu[];
</script>

<Sheet.Root>
	<Sheet.Trigger asChild let:builder>
		<Button builders={[builder]} size="icon" variant="outline" class="sm:hidden">
			<PanelLeft class="h-5 w-5" />
			<span class="sr-only">Toggle Menu</span>
		</Button>
	</Sheet.Trigger>
	<Sheet.Content side="left" class="sm:max-w-xs">
		<nav class="grid gap-6 text-lg font-medium">
			{#each menu as item}
				<a
					href={`${base}${item.href}`}
					class="flex items-center gap-4 px-2.5 {isActive(item.href)
						? 'text-foreground'
						: 'text-muted-foreground hover:text-foreground'}"
				>
					<svelte:component this={item.icon} class="h-5 w-5" />
					{item.name || ''}
				</a>
			{/each}
		</nav>
	</Sheet.Content>
</Sheet.Root>

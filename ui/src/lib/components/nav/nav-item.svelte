<script lang="ts">
	import * as Tooltip from '$lib/shadcn/components/ui/tooltip';
	import { page } from '$app/stores';
	import { type Menu } from '$lib/types';
	import { base } from '$app/paths';
	$: isActive = $page.route.id == item.href;

	$: classes = () => {
		const baseClasses = 'flex h-9 w-9 items-center justify-center md:h-8 md:w-8';
		const inactiveClasses =
			'rounded-lg text-muted-foreground transition-colors hover:text-foreground md:text-base';
		const activeClasses =
			'group shrink-0 gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground';

		return `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`;
	};

	export let item: Menu;
</script>

<Tooltip.Root>
	<Tooltip.Trigger asChild let:builder>
		<a href={`${base}${item.href}`} class={classes()} use:builder.action {...builder}>
			<svelte:component
				this={item.icon}
				class={isActive ? ' h-4 w-4 group-hover:scale-110' : 'h-5 w-5'}
			/>
			<span class="sr-only">{item.name || ''}</span>
		</a>
	</Tooltip.Trigger>
	<Tooltip.Content side="right">{item.name || ''}</Tooltip.Content>
</Tooltip.Root>

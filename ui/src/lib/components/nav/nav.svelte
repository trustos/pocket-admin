<script lang="ts">
	import ShoppingCart from 'lucide-svelte/icons/shopping-cart';
	import ChartLine from 'lucide-svelte/icons/chart-line';
	import { type Menu } from '$lib/types';

	import * as Tooltip from '$lib/shadcn/components/ui/tooltip';
	import Package from 'lucide-svelte/icons/package';
	import UsersRound from 'lucide-svelte/icons/users-round';
	import Settings from 'lucide-svelte/icons/settings';
	import { NavItem } from '$lib/components/nav';

	export let menu: Menu[];

	$: topMenu = menu.filter((item) => item.position === 'top');
	$: bottomMenu = menu.filter((item) => item.position === 'bottom');
</script>

<nav class="flex flex-col items-center gap-4 px-2 py-4">
	{#each topMenu as item}
		<NavItem {item} />
	{/each}

	<!-- <a
		href="##"
		class="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
	>
		<Package2 class="h-4 w-4 transition-all group-hover:scale-110" />
		<span class="sr-only">Acme Inc</span>
	</a> -->

	<!-- <Tooltip.Root>
		<Tooltip.Trigger asChild let:builder>
			<a
				href="##"
				class="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
				use:builder.action
				{...builder}
			>
				<House class="h-5 w-5" />
				<span class="sr-only">Dashboard</span>
			</a>
		</Tooltip.Trigger>
		<Tooltip.Content side="right">Dashboard</Tooltip.Content>
	</Tooltip.Root> -->
	<!-- <NavItem isActive={activeRoute === '/'} name="Dashboard">
		<House
			class={activeRoute == '/' ? ' h-4 w-4 transition-all group-hover:scale-110' : 'h-5 w-5'}
		/>
	</NavItem> -->
	<!-- <Tooltip.Root>
		<Tooltip.Trigger asChild let:builder>
			<a
				href="##"
				class="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
				use:builder.action
				{...builder}
			>
				<ShoppingCart class="h-5 w-5" />
				<span class="sr-only">Orders</span>
			</a>
		</Tooltip.Trigger>
		<Tooltip.Content side="right">Orders</Tooltip.Content>
	</Tooltip.Root>
	<Tooltip.Root>
		<Tooltip.Trigger asChild let:builder>
			<a
				href="##"
				class="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
				use:builder.action
				{...builder}
			>
				<Package class="h-5 w-5" />
				<span class="sr-only">Products</span>
			</a>
		</Tooltip.Trigger>
		<Tooltip.Content side="right">Products</Tooltip.Content>
	</Tooltip.Root>
	<Tooltip.Root>
		<Tooltip.Trigger asChild let:builder>
			<a
				href="##"
				class="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
				use:builder.action
				{...builder}
			>
				<UsersRound class="h-5 w-5" />
				<span class="sr-only">Customers</span>
			</a>
		</Tooltip.Trigger>
		<Tooltip.Content side="right">Customers</Tooltip.Content>
	</Tooltip.Root>
	<Tooltip.Root>
		<Tooltip.Trigger asChild let:builder>
			<a
				href="##"
				class="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
				use:builder.action
				{...builder}
			>
				<ChartLine class="h-5 w-5" />
				<span class="sr-only">Analytics</span>
			</a>
		</Tooltip.Trigger>
		<Tooltip.Content side="right">Analytics</Tooltip.Content>
	</Tooltip.Root> -->
</nav>
<nav class="mt-auto flex flex-col items-center gap-4 px-2 py-4">
	{#each bottomMenu as item}
		<NavItem {item} />
	{/each}
	<!-- <Tooltip.Root>
		<Tooltip.Trigger asChild let:builder>
			<a
				href="##"
				class="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
				use:builder.action
				{...builder}
			>
				<Settings class="h-5 w-5" />
				<span class="sr-only">Settings</span>
			</a>
		</Tooltip.Trigger>
		<Tooltip.Content side="right">Settings</Tooltip.Content>
	</Tooltip.Root> -->
</nav>

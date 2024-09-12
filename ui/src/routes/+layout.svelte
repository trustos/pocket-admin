<script lang="ts">
	import '../app.css';
	import type { LayoutData } from './$types';
	import { setContext } from 'svelte';
	import { user } from '$lib/stores';
	import pb from '$lib/pocketbase';

	import House from 'lucide-svelte/icons/house';
	import ChartLine from 'lucide-svelte/icons/chart-line';
	import Package from 'lucide-svelte/icons/package';
	import Package2 from 'lucide-svelte/icons/package-2';
	import PanelLeft from 'lucide-svelte/icons/panel-left';
	import Search from 'lucide-svelte/icons/search';
	import ShoppingCart from 'lucide-svelte/icons/shopping-cart';
	import UsersRound from 'lucide-svelte/icons/users-round';

	import * as Breadcrumb from '$lib/shadcn/components/ui/breadcrumb';
	import { Button } from '$lib/shadcn/components/ui/button';
	import * as DropdownMenu from '$lib/shadcn/components/ui/dropdown-menu';
	import { Input } from '$lib/shadcn/components/ui/input';
	import * as Sheet from '$lib/shadcn/components/ui/sheet';

	import { Nav } from '$lib/components/nav';
	import placeholderUser from '$lib/images/placeholder-user.jpg';

	export let data: LayoutData;

	$: if (pb.authStore.isValid) {
		user.set(pb.authStore.model);
		setContext('user', pb.authStore.model);
	} else {
		user.set(null);
		pb.authStore.clear();
	}
</script>

<div class="flex min-h-screen w-full flex-col bg-muted/40">
	{#if $user}
		<aside class="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
			<Nav menu={data.menu} />
		</aside>
		<div class="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
			<header
				class="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6"
			>
				<Sheet.Root>
					<Sheet.Trigger asChild let:builder>
						<Button builders={[builder]} size="icon" variant="outline" class="sm:hidden">
							<PanelLeft class="h-5 w-5" />
							<span class="sr-only">Toggle Menu</span>
						</Button>
					</Sheet.Trigger>
					<Sheet.Content side="left" class="sm:max-w-xs">
						<nav class="grid gap-6 text-lg font-medium">
							<a
								href="##"
								class="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
							>
								<Package2 class="h-5 w-5 transition-all group-hover:scale-110" />
								<span class="sr-only">Acme Inc</span>
							</a>
							<a
								href="##"
								class="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
							>
								<House class="h-5 w-5" />
								Dashboard
							</a>
							<a href="##" class="flex items-center gap-4 px-2.5 text-foreground">
								<ShoppingCart class="h-5 w-5" />
								Orders
							</a>
							<a
								href="##"
								class="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
							>
								<Package class="h-5 w-5" />
								Products
							</a>
							<a
								href="##"
								class="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
							>
								<UsersRound class="h-5 w-5" />
								Customers
							</a>
							<a
								href="##"
								class="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
							>
								<ChartLine class="h-5 w-5" />
								Settings
							</a>
						</nav>
					</Sheet.Content>
				</Sheet.Root>
				<Breadcrumb.Root class="hidden md:flex">
					<Breadcrumb.List>
						<Breadcrumb.Item>
							<Breadcrumb.Link href="##">Dashboard</Breadcrumb.Link>
						</Breadcrumb.Item>
						<Breadcrumb.Separator />
						<Breadcrumb.Item>
							<Breadcrumb.Link href="##">Orders</Breadcrumb.Link>
						</Breadcrumb.Item>
						<Breadcrumb.Separator />
						<Breadcrumb.Item>
							<Breadcrumb.Page>Recent Orders</Breadcrumb.Page>
						</Breadcrumb.Item>
					</Breadcrumb.List>
				</Breadcrumb.Root>
				<div class="relative ml-auto flex-1 md:grow-0">
					<Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
					<Input
						type="search"
						placeholder="Search..."
						class="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
					/>
				</div>
				<DropdownMenu.Root>
					<DropdownMenu.Trigger asChild let:builder>
						<Button
							variant="outline"
							size="icon"
							class="overflow-hidden rounded-full"
							builders={[builder]}
						>
							<img
								src={placeholderUser}
								width={36}
								height={36}
								alt="Avatar"
								class="overflow-hidden rounded-full"
							/>
						</Button>
					</DropdownMenu.Trigger>
					<DropdownMenu.Content align="end">
						<DropdownMenu.Label>My Account</DropdownMenu.Label>
						<DropdownMenu.Separator />
						<DropdownMenu.Item>Settings</DropdownMenu.Item>
						<DropdownMenu.Item>Support</DropdownMenu.Item>
						<DropdownMenu.Separator />
						<DropdownMenu.Item>Logout</DropdownMenu.Item>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			</header>

			<slot></slot>
		</div>
	{:else}
		<slot></slot>
	{/if}
</div>

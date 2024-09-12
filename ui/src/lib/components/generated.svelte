<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import { Separator } from '$lib/components/ui/separator';
	import { Home, Settings, Users, Mail, FileText } from 'lucide-svelte';

	const menuItems = [
		{ icon: Home, label: 'Home', subitems: ['Dashboard', 'Analytics', 'Reports'] },
		{ icon: Users, label: 'Users', subitems: ['Manage', 'Roles', 'Permissions'] },
		{ icon: Mail, label: 'Mail', subitems: ['Inbox', 'Sent', 'Drafts', 'Trash'] },
		{ icon: Settings, label: 'Settings', subitems: ['General', 'Security', 'Notifications'] }
	];

	let selectedMenuItem: (typeof menuItems)[0] | null = null;
	let selectedSubitem: string | null = null;

	function selectMenuItem(item: (typeof menuItems)[0]) {
		selectedMenuItem = item;
		selectedSubitem = null;
	}

	function selectSubitem(subitem: string) {
		selectedSubitem = subitem;
	}
</script>

<div class="flex h-screen">
	<!-- Left-side vertical menu -->
	<div class="flex w-16 flex-col items-center space-y-4 bg-secondary p-2">
		{#each menuItems as item}
			<Button
				variant="ghost"
				size="icon"
				on:click={() => selectMenuItem(item)}
				class="h-12 w-12"
				aria-label={item.label}
			>
				<svelte:component this={item.icon} class="h-6 w-6" />
			</Button>
		{/each}
	</div>

	<!-- Middle section: Subitems list -->
	<div class="w-48 border-r bg-background">
		{#if selectedMenuItem}
			<ScrollArea class="h-full">
				<div class="p-4">
					<h2 class="mb-2 text-lg font-semibold">{selectedMenuItem.label}</h2>
					<Separator class="my-2" />
					<ul class="space-y-2">
						{#each selectedMenuItem.subitems as subitem}
							<li>
								<Button
									variant="ghost"
									class="w-full justify-start"
									on:click={() => selectSubitem(subitem)}
								>
									{subitem}
								</Button>
							</li>
						{/each}
					</ul>
				</div>
			</ScrollArea>
		{:else}
			<div class="p-4 text-muted-foreground">Select a menu item</div>
		{/if}
	</div>

	<!-- Right section: Content area -->
	<div class="flex-1 p-6">
		{#if selectedSubitem}
			<h1 class="mb-4 text-2xl font-bold">{selectedSubitem}</h1>
			<p>Content for {selectedSubitem} goes here.</p>
		{:else}
			<div class="text-muted-foreground">Select a subitem to view content</div>
		{/if}
	</div>
</div>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
	}
</style>

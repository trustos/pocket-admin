<script lang="ts">
	import Sun from 'lucide-svelte/icons/sun';
	import Moon from 'lucide-svelte/icons/moon';
	import { onMount } from 'svelte';
	import { resetMode, setMode, mode } from 'mode-watcher';
	import * as DropdownMenu from '$lib/shadcn/components/ui/dropdown-menu';
	import { Button } from '$lib/shadcn/components/ui/button';
	import { writable } from 'svelte/store';

	const displayMode = writable<'light' | 'dark' | 'system'>('system');

	// Initialize on mount
	onMount(() => {
		const storedTheme = localStorage.getItem('mode-watcher-mode');
		displayMode.set(storedTheme === null ? 'system' : (storedTheme as 'light' | 'dark'));
	});

	// Update displayMode whenever mode changes or localStorage changes
	$: {
		const storedTheme = localStorage.getItem('mode-watcher-mode');
		if (typeof window !== 'undefined') {
			displayMode.set(storedTheme === null ? 'system' : (storedTheme as 'light' | 'dark'));
		}
	}

	// Set up theme change handlers
	function handleSetMode(newMode: 'light' | 'dark') {
		setMode(newMode);
		displayMode.set(newMode);
	}

	function handleResetMode() {
		resetMode();
		displayMode.set('system');
	}
</script>

<div class="container mx-auto p-4">
	<h1 class="mb-4 text-2xl font-bold">General Settings</h1>

	<div class="mb-4">
		<label for="theme-select" class="mb-2 block text-sm font-medium">Theme</label>

		<DropdownMenu.Root>
			<DropdownMenu.Trigger asChild let:builder>
				<Button builders={[builder]} variant="outline" class="min-w-[140px] justify-between">
					<span class="flex items-center gap-2">
						<Sun
							class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
						/>
						<Moon
							class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
						/>
						{$displayMode.charAt(0).toUpperCase() + $displayMode.slice(1)}
					</span>
				</Button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content align="end">
				<DropdownMenu.Item
					on:click={() => handleSetMode('light')}
					disabled={$displayMode === 'light'}
				>
					Light
				</DropdownMenu.Item>
				<DropdownMenu.Item
					on:click={() => handleSetMode('dark')}
					disabled={$displayMode === 'dark'}
				>
					Dark
				</DropdownMenu.Item>
				<DropdownMenu.Item on:click={() => handleResetMode()} disabled={$displayMode === 'system'}>
					System
				</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</div>
</div>

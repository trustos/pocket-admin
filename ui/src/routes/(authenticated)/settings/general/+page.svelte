<script lang="ts">
	import * as Select from '$lib/shadcn/components/ui/select';
	import { Button } from '$lib/shadcn/components/ui/button';
	import { mode } from 'mode-watcher';

	let currentTheme: 'light' | 'dark' | 'system' = $mode === 'system' ? 'system' : $mode;

	function handleThemeChange(value: 'light' | 'dark' | 'system') {
		currentTheme = value;
		if (value === 'system') {
			mode.update(() => 'system');
		} else {
			mode.update(() => value);
		}
	}
</script>

<div class="container mx-auto p-4">
	<h1 class="mb-4 text-2xl font-bold">Settings</h1>

	<div class="mb-4">
		<label for="theme-select" class="mb-2 block text-sm font-medium">Theme</label>
		<Select.Root value={currentTheme} on:change={() => handleThemeChange}>
			<Select.Trigger class="w-[180px]">
				<Select.Value placeholder="Select a theme" />
			</Select.Trigger>
			<Select.Content>
				<Select.Item value="light">Light</Select.Item>
				<Select.Item value="dark">Dark</Select.Item>
				<Select.Item value="system">System</Select.Item>
			</Select.Content>
		</Select.Root>
	</div>

	<Button>Save Settings</Button>
</div>

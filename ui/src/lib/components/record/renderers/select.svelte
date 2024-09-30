<script lang="ts">
	import { tick } from 'svelte';
	import Check from 'lucide-svelte/icons/check';
	import ChevronsUpDown from 'lucide-svelte/icons/chevrons-up-down';
	import X from 'lucide-svelte/icons/x';
	import Eraser from 'lucide-svelte/icons/eraser';
	import * as Popover from '$lib/shadcn/components/ui/popover';
	import * as Command from '$lib/shadcn/components/ui/command';
	import { Badge } from '$lib/shadcn/components/ui/badge';
	import { cn } from '$lib/shadcn/utils.js';
	import { buttonVariants, Button } from '$lib/shadcn/components/ui/button';
	import { Input } from '$lib/shadcn/components/ui/input';
	import type { SchemaField } from '$lib/types';
	import { Tooltip } from '$lib/components/common';

	let open = false;

	function closeAndFocusTrigger(triggerId: string) {
		open = false;
		tick().then(() => {
			document.getElementById(triggerId)?.focus();
		});
	}

	export let attrs: Record<string, unknown>;
	export let value: string | string[];
	export let options: SchemaField['options'];

	let singleOption = (options?.maxSelect ?? 1) <= 1;

	const values = options?.values || [];

	function handleSelect(
		option: string,
		ids: {
			content: string;
			trigger: string;
		}
	) {
		if (singleOption) {
			value = option;
		} else {
			if (Array.isArray(value)) {
				if (value.includes(option)) {
					value = value.filter((v) => v !== option);
				} else {
					value = [...value, option];
				}
			} else {
				value = [option];
			}
		}
		closeAndFocusTrigger(ids.trigger);
	}

	function removeOption(option: string) {
		if (singleOption) {
			value = '';
		} else {
			value = (value as string[]).filter((v) => v !== option);
		}
	}

	const clearOptions = () => {
		if (singleOption) {
			value = '';
		} else {
			value = [];
		}
	};
</script>

<Popover.Root bind:open let:ids>
	<Popover.Trigger
		class={cn(
			buttonVariants({ variant: 'outline' }),
			'h-auto justify-between',
			!value?.length && 'text-muted-foreground',
			singleOption && 'w-[200px]'
		)}
		role="combobox"
		{...attrs}
	>
		{#if value?.length === 0}
			Select {singleOption ? 'option' : 'options'}
		{:else if singleOption}
			{value || 'Select option'}
		{:else}
			<div class="flex flex-wrap gap-1 overflow-hidden">
				{#if !value}
					Select options
				{:else}
					{#each value as option}
						<Badge variant="secondary" class="mr-1">
							{option}
							<Button
								variant="ghost"
								class="ml-1 h-auto w-auto p-0"
								on:click={(e) => {
									e.stopPropagation();
									removeOption(option);
								}}
							>
								<X class="h-3 w-3" />
							</Button>
						</Badge>
					{/each}
				{/if}
			</div>
		{/if}
		<ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
	</Popover.Trigger>
	<Input {...attrs} bind:value type="hidden" />
	<Popover.Content class={`${singleOption ? 'w-[200px]' : ''} p-0`}>
		<Command.Root>
			<Command.Input autofocus placeholder="Search option..." class="h-9" />
			<Command.Empty>No option found.</Command.Empty>
			<Command.Group>
				{#each values as option}
					<Command.Item value={option} onSelect={() => handleSelect(option, ids)}>
						{option}
						<Check
							class={cn(
								'ml-auto h-4 w-4',
								!(singleOption ? value === option : value?.includes(option)) && 'text-transparent'
							)}
						/>
					</Command.Item>
				{/each}
			</Command.Group>
		</Command.Root>
	</Popover.Content>
</Popover.Root>

<span
	role="button"
	class="align-bottom"
	on:click={() => clearOptions()}
	tabindex="0"
	on:keypress={() => clearOptions()}
>
	<Tooltip text="Clear options">
		<Eraser
			class={`transition-all ${value?.length ? 'hover:animate-wiggle text-primary' : 'text-muted'}`}
		/>
	</Tooltip>
</span>

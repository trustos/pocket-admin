<script lang="ts">
	import * as Tooltip from '$lib/shadcn/components/ui/tooltip';

	export let name: string;
</script>

<Tooltip.Root>
	<Tooltip.Trigger asChild let:builder>
		<a
			href="##"
			class="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
			use:builder.action
			{...builder}
		>
			<slot></slot>
			<span class="sr-only">{name || ''}</span>
		</a>
	</Tooltip.Trigger>
	<Tooltip.Content side="right">{name || ''}</Tooltip.Content>
</Tooltip.Root>

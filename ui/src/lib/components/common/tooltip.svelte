<script lang="ts">
	import * as Tooltip from '$lib/shadcn/components/ui/tooltip';
	import { cn } from '$lib/shadcn/utils';

	export let text: string;
	// export let open: boolean;
	export let className: string = '';

	export { className as class };
</script>

<Tooltip.Root disableHoverableContent openDelay={100}>
	<Tooltip.Trigger class="inline-block w-min">
		<!-- <div builders={[builder]}>
		</div> -->
		<!-- <Wrapper {...builder}> -->
		<slot></slot>
		<!-- </Wrapper> -->
		<!-- <Button builders={[builder]} variant="outline">Hover</Button> -->
	</Tooltip.Trigger>
	<Tooltip.Content class={cn(className)} side="top">
		<p>{text}</p>
	</Tooltip.Content>
</Tooltip.Root>

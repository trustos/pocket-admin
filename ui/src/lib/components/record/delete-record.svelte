<script lang="ts">
	import * as Alert from '$lib/shadcn/components/ui/alert/';

	export let count = 0;
</script>

<Alert.Root {...$$restProps}>
	<Alert.Title class="text-center">Selected <b>{count}</b> record{count > 1 ? 's' : ''}</Alert.Title
	>
	<Alert.Description class="mt-2 flex justify-center gap-2">
		<slot></slot>
	</Alert.Description>
</Alert.Root>

<script lang="ts">
	import ExclamationTriangle from 'svelte-radix/ExclamationTriangle.svelte';
	import * as Alert from '$lib/shadcn/components/ui/alert';

	export let title: string = '';
	export let description: string = '';
</script>

<Alert.Root variant="destructive">
	<ExclamationTriangle class="h-4 w-4" />
	{#if title}
		<Alert.Title>{title}</Alert.Title>
	{/if}
	{#if description}
		<Alert.Description>{description}</Alert.Description>
	{/if}
</Alert.Root>

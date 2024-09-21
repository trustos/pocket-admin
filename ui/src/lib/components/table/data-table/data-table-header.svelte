<script lang="ts">
	import { fieldIcons, type SchemaFiledType } from '$lib/types';
	import { capitalizeFirstLetter } from '$lib/helpers';

	export let name: string;
	export let type: SchemaFiledType;
	export let showIcons: boolean = true;
</script>

<span class="text-nowrap">
	{#if showIcons}
		<svelte:component this={fieldIcons[type || 'any']} class="inline w-4" />
		{capitalizeFirstLetter(name)}
	{:else}
		{capitalizeFirstLetter(name)}
	{/if}
</span>

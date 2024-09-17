<script lang="ts">
	import { fieldIcons } from '$lib/types/constants';
	import { capitalizeFirstLetter } from '$lib/helpers';

	export let name: any;
	export let type: any;
	export let showIcons: boolean = true;

	console.log(name, type);
</script>

<span class="text-nowrap">
	{#if showIcons}
		<svelte:component this={fieldIcons[type || 'any']} class="inline w-4" />
		{capitalizeFirstLetter(name)}
	{:else}
		{capitalizeFirstLetter(name)}
	{/if}
</span>

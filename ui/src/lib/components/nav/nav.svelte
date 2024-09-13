<script lang="ts">
	import { type Menu } from '$lib/types';
	import { NavItem } from '$lib/components/nav';

	export let menu: Menu[];

	$: topMenu = menu.filter((item) => item.position === 'top');
	$: bottomMenu = menu.filter((item) => item.position === 'bottom');
</script>

<nav class="flex flex-col items-center gap-4 px-2 py-4">
	{#each topMenu as item}
		<NavItem {item} />
	{/each}
</nav>
<nav class="mt-auto flex flex-col items-center gap-4 px-2 py-4">
	{#each bottomMenu as item}
		<NavItem {item} />
	{/each}
</nav>

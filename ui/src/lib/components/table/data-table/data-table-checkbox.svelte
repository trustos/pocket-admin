<script lang="ts">
	import { Checkbox } from '$lib/shadcn/components/ui/checkbox';
	import type { Writable } from 'svelte/store';

	export let checked: Writable<boolean>;
	let className = '';
	export { className as class };
</script>

<Checkbox class={className} bind:checked={$checked} />

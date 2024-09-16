<script lang="ts">
	import { cn } from '$lib/shadcn/utils';
	export let classes: string = '';
	export let value: string;
</script>

<span class={cn('', classes)}>{value}</span>

<script lang="ts">
	export let value: boolean;
</script>

<span class={value ? 'text-green-500' : 'text-red-500'}>
	{value ? 'True' : 'False'}
</span>

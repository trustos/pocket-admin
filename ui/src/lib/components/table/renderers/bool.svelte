<!-- <script lang="ts">
	export let value: boolean;
	export let onChange: ((value: boolean) => void) | undefined = undefined;

	function handleClick() {
		if (onChange) {
			onChange(!value);
		}
	}
</script>

<span
	class={value ? 'text-green-500' : 'text-red-500'}
	on:click={handleClick}
	on:keydown={handleClick}
	role="button"
	tabindex="0"
>
	{value ? 'True' : 'False'}
</span> -->

<script lang="ts">
	import { Switch } from '$lib/shadcn/components/ui/switch';

	export let value: boolean;
	export let onChange: ((newValue: boolean) => void) | undefined = undefined;

	function handleChange(newValue: boolean) {
		console.log('Switch value changed to:', newValue); // Add debug logging
		if (onChange) {
			onChange(newValue);
		}
	}
</script>

<Switch checked={value} onCheckedChange={handleChange} disabled={!onChange} />

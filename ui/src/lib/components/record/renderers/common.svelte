<script lang="ts">
	import * as Form from '$lib/shadcn/components/ui/form';
	import { Input } from '$lib/shadcn/components/ui/input';
	import { fieldIcons } from '$lib/types';
	import type { RecordModel } from 'pocketbase';

	export let fieldName: string;
	export let icon: (typeof fieldIcons)[keyof typeof fieldIcons];
	export let attrs: Record<string, any>;
	export let value: RecordModel[keyof RecordModel];
</script>

<Form.Label>
	<span class="text-muted-foreground">
		<svelte:component this={icon} class="inline w-4" />
		{fieldName}
	</span>
</Form.Label>
<Input {...attrs} bind:value placeholder="m@example.com" />

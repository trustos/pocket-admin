<script lang="ts">
	import type { RecordModel } from 'pocketbase';

	import { Switch } from '$lib/shadcn/components/ui/switch';

	export let attrs: Record<string, unknown>;
	export let value: RecordModel[keyof RecordModel];
</script>

<Switch includeInput {...attrs} bind:checked={value} />

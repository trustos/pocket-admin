<script lang="ts">
	import { Input } from '$lib/shadcn/components/ui/input';
	import type { RecordModel } from 'pocketbase';

	export let attrs: Record<string, unknown>;
	export let value: RecordModel[keyof RecordModel];
</script>

<Input {...attrs} bind:value type="email" autocomplete="off" />

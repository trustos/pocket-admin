<script lang="ts">
	import { Badge } from '$lib/shadcn/components/ui/badge';
	export let value: string;
</script>

<Badge variant="outline">
	{value}
</Badge>

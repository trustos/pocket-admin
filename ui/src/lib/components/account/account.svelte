<script lang="ts">
	import pb from '$lib/pocketbase';
	import * as DropdownMenu from '$lib/shadcn/components/ui/dropdown-menu';
	import { Button } from '$lib/shadcn/components/ui/button';
	import UserRound from 'lucide-svelte/icons/user-round';
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { user } from '$lib/stores';

	const logoutHandler = () => {
		pb.logout();
		goto('/');
	};
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button variant="outline" size="icon" class="overflow-hidden rounded-full" builders={[builder]}>
			<UserRound />
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content align="end">
		<DropdownMenu.Label>{$user?.name}</DropdownMenu.Label>
		<DropdownMenu.Separator />
		<DropdownMenu.Item href={`${base}/account`}>Profile</DropdownMenu.Item>
		<DropdownMenu.Separator />
		<DropdownMenu.Item on:click={() => logoutHandler()}>Logout</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>

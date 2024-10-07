<script lang="ts">
	import * as DropdownMenu from '$lib/shadcn/components/ui/dropdown-menu';
	import { Button } from '$lib/shadcn/components/ui/button';
	import UserRound from 'lucide-svelte/icons/user-round';
	import { base } from '$app/paths';
	import { auth } from '$lib/stores';

	const logoutHandler = () => {
		auth.logout();
	};
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button variant="outline" size="icon" class="overflow-hidden rounded-full" builders={[builder]}>
			<UserRound />
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content align="end">
		<DropdownMenu.Label>{$auth?.name || $auth?.email}</DropdownMenu.Label>
		<DropdownMenu.Separator />
		<DropdownMenu.Item href={`${base}/account`}>Profile</DropdownMenu.Item>
		<DropdownMenu.Separator />
		<DropdownMenu.Item on:click={() => logoutHandler()}>Logout</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>

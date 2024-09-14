<script lang="ts">
	import { user } from '$lib/stores';
	import * as Card from '$lib/shadcn/components/ui/card';
	import { Label } from '$lib/shadcn/components/ui/label';
</script>

<main
	class="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-1 xl:grid-cols-1"
>
	<Card.Root class="mx-auto w-full">
		<Card.Header>
			<Card.Title>Profile</Card.Title>
			<Card.Description>Your personal information</Card.Description>
		</Card.Header>
		<Card.Content class="space-y-4">
			<div class="space-y-2">
				<Label for="name">Name</Label>
				<p id="name" class="text-sm">{$user.name}</p>
			</div>
			<div class="space-y-2">
				<Label for="email">Email</Label>
				<p id="email" class="text-sm">{$user.email}</p>
			</div>
			{#each Object.entries($user) as [key, value]}
				{#if key !== 'name' && key !== 'email'}
					<div class="space-y-2">
						<Label for={key}>{key}</Label>
						<p id={key} class="text-sm">{value}</p>
					</div>
				{/if}
			{/each}
		</Card.Content>
	</Card.Root>
</main>

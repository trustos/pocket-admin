<script lang="ts">
	import { page } from '$app/stores';
	import * as Breadcrumb from '$lib/shadcn/components/ui/breadcrumb';
	import { derived } from 'svelte/store';

	// Create a derived store to get the URL path from the page store
	const breadcrumbs = derived(page, ($page) => {
		const segments = $page.url.pathname.split('/').filter(Boolean);
		return segments.map((segment, index) => ({
			name: segment.charAt(0).toUpperCase() + segment.slice(1),
			href: '/' + segments.slice(0, index + 1).join('/')
		}));
	});

	$: console.log($breadcrumbs);
</script>

<Breadcrumb.Root class="hidden md:flex">
	<Breadcrumb.List>
		{#each $breadcrumbs as breadcrumb, index}
			<Breadcrumb.Item>
				<!-- <a href={breadcrumb.href}>{breadcrumb.name}</a> -->
				<Breadcrumb.Link href={breadcrumb.href}>{breadcrumb.name}</Breadcrumb.Link>
			</Breadcrumb.Item>
			{#if index !== $breadcrumbs.length - 1}
				<Breadcrumb.Separator />
			{/if}
		{/each}
	</Breadcrumb.List>
</Breadcrumb.Root>

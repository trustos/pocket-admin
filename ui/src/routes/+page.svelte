<script lang="ts">
	import { auth } from '$lib/stores';
	import { VisXYContainer, VisStackedBar, VisAxis, VisTooltip } from '@unovis/svelte';
	import { StackedBar } from '@unovis/ts';

	interface CollectionData {
		name: string;
		record_count: number;
		type: string;
	}

	let topCollections: CollectionData[] = [];

	// Predefined set of contrasting colors
	const contrastingColors = [
		'#FF6B6B', // Red
		'#4ECDC4', // Teal
		'#45B7D1', // Light Blue
		'#FFA07A', // Light Salmon
		'#98D8C8', // Pale Green
		'#F7DC6F', // Yellow
		'#BB8FCE', // Light Purple
		'#F1948A', // Light Coral
		'#82E0AA', // Light Green
		'#F8C471' // Light Orange
	];

	// Generate and store a color for each collection
	const collectionColors = new Map<string, string>();

	async function getTopCollectionsWithCount() {
		try {
			const response = await auth.pb.send('/api/top_collections', {
				method: 'GET'
			});
			topCollections = response;
			// Assign a color to each collection
			topCollections.forEach((collection, index) => {
				if (!collectionColors.has(collection.name)) {
					collectionColors.set(
						collection.name,
						contrastingColors[index % contrastingColors.length]
					);
				}
			});
		} catch (error) {
			console.error('Error fetching top collections:', error);
		}
	}

	const xAccessor = (d: CollectionData) => topCollections.indexOf(d);
	const yAccessor = (d: CollectionData) => d.record_count;
	const keys = ['record_count'];

	const colorAccessor = (d: CollectionData) => collectionColors.get(d.name) || '#FFA500'; // Default to orange if no color assigned

	function getYAxisTicks(data: CollectionData[]) {
		const maxCount = Math.max(...data.map((d) => d.record_count));
		const tickCount = Math.min(maxCount, 5);
		return Array.from({ length: tickCount + 1 }, (_, i) => Math.round((i * maxCount) / tickCount));
	}

	$: yAxisTicks = getYAxisTicks(topCollections);

	// Tooltip triggers
	const triggers = {
		[StackedBar.selectors.bar]: (d: CollectionData) => `
            <div>
                <strong>Collection:</strong> ${d.name}<br>
                <strong>Record Count:</strong> ${d.record_count}<br>
                <strong>Type:</strong> ${d.type}
            </div>
        `
	};

	// X-axis tick format function
	const xAxisTickFormat = (i: number) => topCollections[i]?.name || '';

	// Y-axis tick format function
	const yAxisTickFormat = (d: number) => d.toString();

	// Run the function when the component mounts
	import { onMount } from 'svelte';
	onMount(() => {
		getTopCollectionsWithCount();
	});
</script>

<main
	class="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3"
>
	<div class="col-span-3">
		<div class="mb-4">Top 5 Collections by Record Count</div>
		<VisXYContainer data={topCollections} height={300} width={700}>
			<VisStackedBar x={xAccessor} y={[yAccessor]} {keys} color={colorAccessor} />
			<VisAxis gridLine={false} type="x" tickFormat={xAxisTickFormat} />
			<VisTooltip {triggers} />
		</VisXYContainer>
	</div>
</main>

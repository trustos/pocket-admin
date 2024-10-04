<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { ChevronUp, ChevronDown } from 'lucide-svelte';
	import { Button } from '$lib/shadcn/components/ui/button';

	export let time: string = '00:00';

	const dispatch = createEventDispatcher();

	let hour: number;
	let minute: number;

	$: {
		[hour, minute] = time.split(':').map(Number);
	}

	function incrementHour() {
		hour = (hour + 1) % 24;
		updateTime();
	}

	function decrementHour() {
		hour = (hour - 1 + 24) % 24;
		updateTime();
	}

	function incrementMinute() {
		minute = (minute + 1) % 60;
		updateTime();
	}

	function decrementMinute() {
		minute = (minute - 1 + 60) % 60;
		updateTime();
	}

	function updateTime() {
		time = `${formatNumber(hour)}:${formatNumber(minute)}`;
		dispatchChange();
	}

	function dispatchChange() {
		dispatch('change', { time });
	}

	function formatNumber(num: number): string {
		return num.toString().padStart(2, '0');
	}

	function validateHour(event: Event) {
		const input = event.target as HTMLInputElement;
		let value = parseInt(input.value);

		if (isNaN(value) || value < 0) {
			value = 0;
		} else if (value > 23) {
			value = 23;
		}

		hour = value;
		updateTime();
	}

	function validateMinute(event: Event) {
		const input = event.target as HTMLInputElement;
		let value = parseInt(input.value);

		if (isNaN(value) || value < 0) {
			value = 0;
		} else if (value > 59) {
			value = 59;
		}

		minute = value;
		updateTime();
	}

	function handleKeydown(event: KeyboardEvent, type: 'hour' | 'minute') {
		if (event.key === 'ArrowUp') {
			event.preventDefault();
			if (type === 'hour') incrementHour();
			else incrementMinute();
		} else if (event.key === 'ArrowDown') {
			event.preventDefault();
			if (type === 'hour') decrementHour();
			else decrementMinute();
		}
	}
</script>

<div class="flex w-full justify-center">
	<div class="inline-flex items-center space-x-2 rounded-md border bg-background p-1">
		<div class="flex items-center">
			<div class="flex flex-col">
				<Button
					on:click={incrementHour}
					variant="ghost"
					size="icon"
					class="h-6 w-6 p-0"
					aria-label="Increment hour"
				>
					<ChevronUp class="h-3 w-3" />
				</Button>
				<Button
					on:click={decrementHour}
					variant="ghost"
					size="icon"
					class="h-6 w-6 p-0"
					aria-label="Decrement hour"
				>
					<ChevronDown class="h-3 w-3" />
				</Button>
			</div>
			<input
				type="text"
				value={formatNumber(hour)}
				on:blur={validateHour}
				on:keydown={(e) => handleKeydown(e, 'hour')}
				class="w-6 bg-transparent text-center text-sm"
				inputmode="numeric"
				pattern="([01]?[0-9]|2[0-3])"
				maxlength="2"
				aria-label="Hour"
			/>
		</div>
		<span class="text-sm font-bold">:</span>
		<div class="flex items-center">
			<input
				type="text"
				value={formatNumber(minute)}
				on:blur={validateMinute}
				on:keydown={(e) => handleKeydown(e, 'minute')}
				class="w-6 bg-transparent text-center text-sm"
				inputmode="numeric"
				pattern="[0-5][0-9]"
				maxlength="2"
				aria-label="Minute"
			/>
			<div class="flex flex-col">
				<Button
					on:click={incrementMinute}
					variant="ghost"
					size="icon"
					class="h-6 w-6 p-0"
					aria-label="Increment minute"
				>
					<ChevronUp class="h-3 w-3" />
				</Button>
				<Button
					on:click={decrementMinute}
					variant="ghost"
					size="icon"
					class="h-6 w-6 p-0"
					aria-label="Decrement minute"
				>
					<ChevronDown class="h-3 w-3" />
				</Button>
			</div>
		</div>
	</div>
</div>

<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { ChevronUp, ChevronDown } from 'lucide-svelte';

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
</script>

<div class="flex w-full justify-center">
	<div class="inline-flex items-center space-x-2 rounded-md border bg-background p-2">
		<div class="flex flex-col items-center">
			<button
				type="button"
				on:click={incrementHour}
				class="rounded-md p-1 hover:bg-muted"
				aria-label="Increment hour"
			>
				<ChevronUp class="h-4 w-4" />
			</button>
			<input
				type="text"
				value={formatNumber(hour)}
				on:blur={validateHour}
				class="w-8 bg-transparent text-center"
				inputmode="numeric"
				pattern="([01]?[0-9]|2[0-3])"
				maxlength="2"
				aria-label="Hour"
			/>
			<button
				type="button"
				on:click={decrementHour}
				class="rounded-md p-1 hover:bg-muted"
				aria-label="Decrement hour"
			>
				<ChevronDown class="h-4 w-4" />
			</button>
		</div>
		<span class="text-xl">:</span>
		<div class="flex flex-col items-center">
			<button
				type="button"
				on:click={incrementMinute}
				class="rounded-md p-1 hover:bg-muted"
				aria-label="Increment minute"
			>
				<ChevronUp class="h-4 w-4" />
			</button>
			<input
				type="text"
				value={formatNumber(minute)}
				on:blur={validateMinute}
				class="w-8 bg-transparent text-center"
				inputmode="numeric"
				pattern="[0-5][0-9]"
				maxlength="2"
				aria-label="Minute"
			/>
			<button
				type="button"
				on:click={decrementMinute}
				class="rounded-md p-1 hover:bg-muted"
				aria-label="Decrement minute"
			>
				<ChevronDown class="h-4 w-4" />
			</button>
		</div>
	</div>
</div>

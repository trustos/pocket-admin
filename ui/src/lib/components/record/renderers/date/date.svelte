<script lang="ts">
	import { Input } from '$lib/shadcn/components/ui/input';
	import CalendarIcon from 'lucide-svelte/icons/calendar';
	import ClockIcon from 'lucide-svelte/icons/clock';
	import Eraser from 'lucide-svelte/icons/eraser';
	import {
		CalendarDate,
		CalendarDateTime,
		DateFormatter,
		parseAbsolute,
		type DateValue
	} from '@internationalized/date';
	import { cn } from '$lib/shadcn/utils.js';
	import { Button } from '$lib/shadcn/components/ui/button/index.js';
	import { Calendar } from '$lib/shadcn/components/ui/calendar/index.js';
	import * as Popover from '$lib/shadcn/components/ui/popover/index.js';
	import { Label } from '$lib/shadcn/components/ui/label';
	import { Tooltip } from '$lib/components/common';
	import TimePicker from '$lib/components/record/renderers/date/timepicker.svelte';

	const df = new DateFormatter('en-US', { dateStyle: 'long', timeZone: 'UTC' });
	const tf = new DateFormatter('en-US', {
		hour: '2-digit',
		minute: '2-digit',
		hour12: false,
		timeZone: 'UTC'
	});

	export let attrs: Record<string, unknown>;
	export let value: string;

	const parseUTC = (utcString: string): CalendarDateTime => {
		if (!utcString) {
			const now = new Date();
			return new CalendarDateTime(
				now.getUTCFullYear(),
				now.getUTCMonth() + 1,
				now.getUTCDate(),
				now.getUTCHours(),
				now.getUTCMinutes()
			);
		}
		// Convert the string to ISO 8601 format
		const date = new Date(utcString);
		const isoString = date.toISOString();
		const parsed = parseAbsolute(isoString, 'UTC');
		return new CalendarDateTime(parsed.year, parsed.month, parsed.day, parsed.hour, parsed.minute);
	};

	let dateTime = parseUTC(value);

	const handleCalendarChange = (newValue: DateValue | undefined) => {
		if (newValue && newValue instanceof CalendarDate) {
			dateTime = new CalendarDateTime(
				newValue.year,
				newValue.month,
				newValue.day,
				dateTime.hour,
				dateTime.minute
			);
			updateValue();
		}
	};

	const handleTimeChange = (event: CustomEvent) => {
		const [hours, minutes] = event.detail.time.split(':');
		dateTime = dateTime.set({
			hour: parseInt(hours),
			minute: parseInt(minutes)
		});
		updateValue();
	};

	const updateValue = () => {
		const date = new Date(
			Date.UTC(dateTime.year, dateTime.month - 1, dateTime.day, dateTime.hour, dateTime.minute)
		);
		value = date.toUTCString();
	};

	const formatDate = (val: string): string => {
		if (!val) return 'Pick a date';
		const parsed = parseUTC(val);
		return df.format(
			new Date(Date.UTC(parsed.year, parsed.month - 1, parsed.day, parsed.hour, parsed.minute))
		);
	};

	const formatTime = (val: string): string => {
		if (!val) return 'and time';
		const parsed = parseUTC(val);
		return tf.format(
			new Date(Date.UTC(parsed.year, parsed.month - 1, parsed.day, parsed.hour, parsed.minute))
		);
	};

	const clearDate = () => {
		value = '';
		dateTime = parseUTC(value);
	};

	$: calendarDate = new CalendarDate(dateTime.year, dateTime.month, dateTime.day);
	$: formattedDate = formatDate(value);
	$: formattedTime = formatTime(value);
</script>

<Popover.Root>
	<Popover.Trigger asChild let:builder class="block overflow-auto">
		<Button
			variant="outline"
			class={cn('w-[280px] justify-start text-left font-normal', !value && 'text-muted-foreground')}
			builders={[builder]}
		>
			<CalendarIcon class="mr-2 h-4 w-4" />
			{formattedDate}
			{formattedTime}
			<Input bind:value {...attrs} type="hidden" />
		</Button>
	</Popover.Trigger>
	<span
		role="button"
		class="align-bottom"
		on:click={() => clearDate()}
		tabindex="0"
		on:keypress={() => clearDate()}
	>
		<Tooltip text="Clear date">
			<Eraser
				class={`transition-all ${value ? 'text-primary hover:animate-wiggle' : 'text-muted'}`}
			/>
		</Tooltip>
	</span>
	<Popover.Content class="w-auto p-0">
		<Calendar value={calendarDate} onValueChange={handleCalendarChange} />
		<div class="border-t border-border p-3">
			<Label for="time" class="mb-2 block text-sm font-medium">Time</Label>
			<div class="flex items-center">
				<ClockIcon class="mr-2 h-4 w-4 opacity-50" />
				<TimePicker
					time={`${dateTime.hour.toString().padStart(2, '0')}:${dateTime.minute.toString().padStart(2, '0')}`}
					on:change={handleTimeChange}
				/>
			</div>
		</div>
	</Popover.Content>
</Popover.Root>

import type { RecordModel } from 'pocketbase';
import type { CollectionSchema } from '$lib/types';
import type { ToastOptions, ToastT } from 'svelte-sonner';

type MenuPosition = 'top' | 'bottom';

export interface Menu {
	name: string;
	href: string;
	position: MenuPosition;
	icon?: unknown;
}

export interface Collection extends RecordModel {
	collectionName: string;
	collectionId: string;
	id: string;
	name: string;
	type: string;
	schema: CollectionSchema;
}

export interface ToastExtendedOptions extends ToastOptions {
	icon?: ToastT['icon'];
}

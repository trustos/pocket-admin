import type { RecordModel } from 'pocketbase';

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
	recordsCount?: number;
}

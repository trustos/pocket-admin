import type { RecordModel } from 'pocketbase';

type MenuPosition = 'top' | 'bottom';

export interface Menu {
	name: string;
	href: string;
	position: MenuPosition;
	icon?: unknown;
}

export interface Collections {
	recordsCount: number;
	name: string;
	id: string;
	schema: RecordModel[];
}

export interface Collection extends RecordModel {
	collectionName: string;
	collectionId: string;
	id: string;
	name: string;
}

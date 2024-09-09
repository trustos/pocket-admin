type MenuPosition = 'top' | 'bottom';

export interface Menu {
	name: string;
	href: string;
	position: MenuPosition;
	icon?: unknown;
}

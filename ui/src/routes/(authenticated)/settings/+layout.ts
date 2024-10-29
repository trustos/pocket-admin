import type { LayoutLoad } from './$types';
import type { PASettings } from '$lib/types';
import { auth } from '$lib/stores';

export const load: LayoutLoad = async () => {
	const settings: PASettings[] = await auth.pb.collection('pa_settings').getFullList();

	return {
		settings: settings.length ? settings[0] : null
	};
};

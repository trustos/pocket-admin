import { toast } from 'svelte-sonner';
import type { ToastExtendedOptions } from '$lib/types';

export const ErrorToast = (message: string, options?: ToastExtendedOptions) => {
	if (!options) {
		options = {
			class: 'bg-red-500 border border-red-800 text-white shadow-lg',
			duration: 5000
		};
	} else {
		options.class = 'bg-red-500 border border-red-800 text-white shadow-lg';
	}

	return toast.error(`${message}`, options);
};

export const WarningToast = (message: string, options?: ToastExtendedOptions) => {
	if (!options) {
		options = {
			class:
				'bg-primary text-white border border-orange-500 rounded-lg px-4 py-3 shadow-lg font-bold',
			duration: 3000
		};
	} else {
		options.class =
			'bg-primary text-white border border-orange-500 rounded-lg px-4 py-3 shadow-lg font-bold';
	}

	return toast.warning(`${message}`, options);
};

export const SuccessToast = (message: string, options?: ToastExtendedOptions) => {
	if (!options) {
		options = {
			class: 'bg-green-500 text-white border border-green-700 rounded-lg shadow-lg font-semibold',
			duration: 3000
		};
	} else {
		options.class =
			'bg-green-500 text-white border border-green-700 rounded-lg shadow-lg font-semibold';
	}

	return toast.success(`${message}`, options);
};

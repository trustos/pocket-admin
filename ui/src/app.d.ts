import type PocketBase from 'pocketbase';
import Record from 'svelte';

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			pb: PocketBase;
		}
		// interface PageData {}
		interface PageState {
			recordPageData: Record;
		}
		// interface Platform {}
	}
}

export {};

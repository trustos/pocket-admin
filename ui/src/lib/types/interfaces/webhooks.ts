export interface WebhookHeaders {
	Authorization: string;
	'Content-Type': string;
	[key: string]: string; // Allow for additional headers
}

export interface WebhookEntry {
	id: string;
	name: string;
	url: string;
	headers: WebhookHeaders;
	events: string[];
	enabled: boolean;
	retryCount: number;
	createdAt: string;
	updatedAt: string;
}

export interface WebhookLog {
	id: string;
	webhookId: string;
	event: string;
	status: 'success' | 'failed';
	response: string;
	timestamp: string;
	retries: number;
}

export interface Webhooks {
	entries: WebhookEntry[];
	logs: WebhookLog[];
}

export interface PASettings {
	collectionId: string;
	collectionName: string;
	created: string;
	id: string;
	updated: string;
	webhooks: Webhooks;
}

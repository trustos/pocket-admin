import { z } from 'zod';

export const webhookHeadersSchema = z
	.object({
		Authorization: z.string().min(1, 'Authorization is required'),
		'Content-Type': z.string().default('application/json')
	})
	.catchall(z.string());

export const webhookSchema = z.object({
	name: z.string().min(1, 'Name is required'),
	url: z.string().url('Must be a valid URL'),
	headers: webhookHeadersSchema,
	events: z.array(z.string()).min(1, 'At least one event must be selected'),
	enabled: z.boolean().default(true),
	retryCount: z.number().min(0).max(10).default(3)
});

export type WebhookFormData = z.infer<typeof webhookSchema>;

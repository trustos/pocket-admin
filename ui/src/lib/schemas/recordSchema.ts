import { z } from 'zod';
import type { CollectionSchema } from '$lib/types';

// A function to generate the Zod schema dynamically
const generateZodSchema = (fields: CollectionSchema) => {
	const schemaShape = fields.reduce((shape: Record<string, z.ZodTypeAny>, field) => {
		let fieldSchema;

		switch (field.type) {
			case 'text':
				fieldSchema = z.string();
				if (field?.options?.min) fieldSchema = fieldSchema.min(Number(field.options.min));
				if (field?.options?.max) fieldSchema = fieldSchema.max(Number(field.options.max));
				break;

			case 'file':
				fieldSchema = z
					.union([z.string(), z.array(z.union([z.string(), z.instanceof(File)]))])
					.refine(
						(value) => {
							if (typeof value === 'string') return true;
							if (Array.isArray(value)) {
								return value.length <= (field.options?.maxSelect || 99);
							}
							return false;
						},
						`Maximum of ${field.options?.maxSelect || 99} files allowed`
					);

				if (field.options?.mimeTypes && field.options.mimeTypes.length > 0) {
					fieldSchema = fieldSchema.refine(
						(value) => {
							if (typeof value === 'string') return true;
							if (Array.isArray(value)) {
								return value.every((item) => {
									if (typeof item === 'string') return true;
									if (item instanceof File) {
										return field.options?.mimeTypes?.includes(item.type) ?? true;
									}
									return false;
								});
							}
							return false;
						},
						`File type must be one of ${field.options.mimeTypes.join(', ')}`
					);
				}
				break;

			case 'editor':
				fieldSchema = z.string();
				break;

			case 'number':
				fieldSchema = z.preprocess(
					(val) => {
						if (typeof val === 'string' && val.trim() === '') return undefined;
						const num = Number(val);
						return isNaN(num) ? val : num;
					},
					z.number({
						invalid_type_error: 'Please enter a valid number',
						required_error: 'Number is required'
					})
				);

				if (field.options?.min !== undefined && field.options.min !== null) {
					const min = Number(field.options.min);
					fieldSchema = fieldSchema.refine((n) => n >= min, {
						message: `Value must be at least ${min}`
					});
				}

				if (field.options?.max !== undefined && field.options.max !== null) {
					const max = Number(field.options.max);
					fieldSchema = fieldSchema.refine((n) => n <= max, {
						message: `Value must be at most ${max}`
					});
				}

				fieldSchema = fieldSchema.default(0);
				break;

			case 'bool':
				fieldSchema = z.boolean();
				break;

			case 'email':
				fieldSchema = z.string().email().optional();
				break;

			case 'url':
				fieldSchema = z.string().url();
				break;

			case 'date':
				fieldSchema = z.string(); // z.date() is possible, but might conflict with formats
				break;

			case 'select':
				if (field?.options?.values && field.options.values.length > 0) {
					const validValues = field.options.values as [string, ...string[]];
					fieldSchema = z.union([z.enum(validValues), z.array(z.enum(validValues))]).default('');
				} else {
					// Fallback to any string if no valid values are provided
					fieldSchema = z.union([z.string(), z.array(z.string())]).default('');
				}
				break;

			case 'relation':
				if (field?.options?.values && field.options.values.length > 0) {
					const validValues = field.options.values as [string, ...string[]];
					fieldSchema = z.union([z.enum(validValues), z.array(z.enum(validValues))]);
				} else {
					// Fallback to any string if no valid values are provided
					fieldSchema = z.union([z.string(), z.array(z.string())]);
				} // Assuming relation is by an ID string
				break;

			case 'json':
				fieldSchema = z.object({}).catchall(z.any());
				break;

			default:
				fieldSchema = z.any();
				break;
		}

		// If the field is not required, make it optional
		if (!field.required) {
			fieldSchema = fieldSchema.optional().or(z.null()).or(z.literal(''));
		}

		shape[field.name] = fieldSchema;
		return shape;
	}, {});

	return z.object(schemaShape);
};

// Generate Zod schema from the fields array
export const recordSchema = (fields: CollectionSchema) => generateZodSchema(fields);

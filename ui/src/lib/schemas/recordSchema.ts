import { nullable, z } from 'zod';
import type { CollectionSchema } from '$lib/types';

// A function to generate the Zod schema dynamically
const generateZodSchema = (fields: CollectionSchema) => {
	const schemaShape = fields.reduce((shape: Record<string, z.ZodTypeAny>, field) => {
		let fieldSchema;

		switch (field.type) {
			case 'text':
				fieldSchema = z.string();
				if (field?.options?.min) fieldSchema = fieldSchema.min(field.options.min);
				if (field?.options?.max) fieldSchema = fieldSchema.max(field.options.max);
				break;

			case 'file':
				fieldSchema = z.array(z.any()).max(field.options?.maxSelect || 99);

				//Validate mimeTypes validation for file type
				if (field.options?.mimeTypes && field.options?.mimeTypes.length > 0) {
					fieldSchema = fieldSchema.refine(
						(files) => {
							return files.every((file: File | string) => {
								if (typeof file === 'string') {
									return true;
								} else if (file instanceof File) {
									return field.options?.mimeTypes?.includes(file.type);
								}
							});
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
					const min = field.options.min;
					fieldSchema = fieldSchema.refine((n) => n >= min, {
						message: `Value must be at least ${min}`
					});
				}

				if (field.options?.max !== undefined && field.options.max !== null) {
					const max = field.options.max;
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
				fieldSchema = z.enum(field?.options?.values as [string, ...string[]]);
				break;

			case 'relation':
				fieldSchema = z.string(); // Assuming relation is by an ID string
				break;

			case 'json':
				fieldSchema = z.object({});
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

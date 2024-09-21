import { z } from 'zod';

// A function to generate the Zod schema dynamically
const generateZodSchema = (fields) => {
	const schemaShape = fields.reduce((shape, field) => {
		let fieldSchema;

		switch (field.type) {
			case 'text':
				fieldSchema = z.string();
				if (field.options.min) fieldSchema = fieldSchema.min(field.options.min);
				if (field.options.max) fieldSchema = fieldSchema.max(field.options.max);
				break;

			case 'file':
				fieldSchema = z.array(z.any()).max(field.options.maxSelect);
				break;

			case 'editor':
				fieldSchema = z.string();
				break;

			case 'number':
				fieldSchema = z.number();
				if (field.options.min !== null) fieldSchema = fieldSchema.min(field.options.min);
				if (field.options.max !== null) fieldSchema = fieldSchema.max(field.options.max);
				break;

			case 'bool':
				fieldSchema = z.boolean();
				break;

			case 'email':
				fieldSchema = z.string().email();
				break;

			case 'url':
				fieldSchema = z.string().url();
				break;

			case 'date':
				fieldSchema = z.string(); // z.date() is possible, but might conflict with formats
				break;

			case 'select':
				fieldSchema = z.enum(field.options.values);
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
			fieldSchema = fieldSchema.optional();
		}

		shape[field.name] = fieldSchema;
		return shape;
	}, {});

	return z.object(schemaShape);
};

// Generate Zod schema from the fields array
export const recordSchema = (fields) => generateZodSchema(fields);

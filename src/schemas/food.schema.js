import { z } from 'zod';

export const createSchema = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .min(3, { message: 'Username must be at least 3 characters' }),
  calories: z
    .string({ required_error: 'Calories is required' })
    .min(0, { message: 'Calories must be at least 1 kcal' }),
  ingredients: z
    .string({ required_error: 'Ingredients must be a string' })
    .optional(),
});

export const updateSchema = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .min(3, { message: 'Username must be at least 3 characters' }),
  calories: z
    .string({ required_error: 'Calories is required' })
    .min(0, { message: 'Calories must be at least 1 kcal' }),
  ingredients: z
    .string({ required_error: 'Ingredients must be a string' })
    .optional(),
});

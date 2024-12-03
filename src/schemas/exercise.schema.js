import { z } from 'zod';

export const createSchema = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .min(2, { message: 'Exercise name must be at least 2 characters' }),
  description: z
    .string({ required_error: 'Description must be a string' })
    .optional(),
});

export const updateSchema = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .min(2, { message: 'Exercise name must be at least 2 characters' }),
  description: z
    .string({ required_error: 'Description must be a string' })
    .optional(),
});

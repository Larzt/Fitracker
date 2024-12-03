import z from 'zod';

export const createSchema = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .min(3, { message: 'Username must be at least 3 characters' }),
  description: z
    .string({ required_error: 'Description is required' })
    .min(3, { message: 'Description must be at least 3 characters' }),
  id: z
    .string({ required_error: 'Id is required' }),
});

export const updateSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(3),
  id: z.string(),
});
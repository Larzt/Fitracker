import { z } from 'zod';

export const createSchema = z.object({
  category: z
    .string({ required_error: 'Category is required' })
    .refine(
      (value) =>
        ['desayuno', 'almuerzo', 'merienda', 'cena', 'aperitivo'].includes(
          value
        ),
      {
        message:
          'Category must be one of: desayuno, almuerzo, merienda, cena, aperitivo',
      }
    ),
});

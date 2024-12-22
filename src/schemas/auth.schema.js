import { z } from 'zod';

export const registerSchema = z.object({
  username: z
    .string({ required_error: 'Username is required' })
    .min(3, { message: 'Username must be at least 3 characters' }),
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Invalid Email' }),
  password: z
    .string({ required_error: 'Password is required' })
    .min(6, { message: 'Password must be at least 6 characters' }),
  age: z
    .string({ required_error: 'Edad is required' })
    .min(0, { message: 'Edad must be a non-negative number' })
    .max(150, { message: 'Edad must be realistic (less than 150)' }),
  weight: z
    .string({ required_error: 'Weight is required' })
    .min(0, { message: 'Weight must be a positive number' })
    .max(500, { message: 'Weight must be realistic (less than 500 kg)' }),
  // calories: z
  //   .string({ required_error: 'Calories is required' })
  //   .min(0, { message: 'Calories must be a positive number' })
  //   .max(10000, {
  //     message: 'Calories must be realistic (less than 10000 kcal)',
  //   }),
  gender: z
    .string({ required_error: 'Sexo is required' })
    .refine((value) => ['masculino', 'femenino'].includes(value), {
      message: 'Sexo must be one of: masculino, femenino',
    }),
});

export const loginSchema = z.object({
  username: z.string({ required_error: 'Username is required' }),
  password: z
    .string({ required_error: 'Password is required' })
    .min(6, { message: 'Password must be at least 6 characters' }),
});

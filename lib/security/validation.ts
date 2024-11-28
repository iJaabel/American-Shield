import { z } from 'zod';
import { SECURITY } from '../config/constants';

export const passwordSchema = z
  .string()
  .min(SECURITY.PASSWORD_MIN_LENGTH, 'Password must be at least 8 characters')
  .max(SECURITY.PASSWORD_MAX_LENGTH, 'Password is too long')
  .regex(
    SECURITY.PASSWORD_REGEX,
    'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
  );

export const emailSchema = z
  .string()
  .email('Invalid email address')
  .min(1, 'Email is required');

export const authSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export type AuthSchema = z.infer<typeof authSchema>;
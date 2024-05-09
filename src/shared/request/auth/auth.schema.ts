import { ISignInDto } from '@/libs';
import { z } from 'zod';

export const signInSchema: z.ZodSchema<ISignInDto> = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

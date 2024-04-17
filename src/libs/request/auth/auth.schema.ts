import { Gender } from "@/libs/common";
import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const signUpSchema = signInSchema.extend({
  name: z.string().min(1),
  gender: z.nativeEnum(Gender),
  address: z.string().optional(),
  dateOfBirth: z.coerce.date().optional(),
  identityNumber: z.string().length(12).optional(),
});

export type SignInSchema = z.infer<typeof signInSchema>;

export type SignUpSchema = z.infer<typeof signUpSchema>;

import { z } from "zod";

export const linkTenantSchema = z.object({
  keyword: z.string(),
  email: z.string().email(),
  phone: z.string(),
});

export type LinkTenantSchema = z.infer<typeof linkTenantSchema>;

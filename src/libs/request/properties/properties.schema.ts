import { z } from "zod";

export const createUnitSchema = z.object({
  name: z.string(),
  area: z.coerce.number(),
  price: z.coerce.number(),
  deposit: z.coerce.number(),
  details: z.string().optional(),
});

export const createPropertySchema = z.object({
  type: z.string(),
  name: z.string().min(1),
  address: z.string().min(1),
  province: z.string().min(1),
  district: z.string().min(1),
  ward: z.string().min(1),
  amenities: z.array(z.string()),
  units: z.array(createUnitSchema),
});

export type CreatePropertySchema = NullableObject<
  z.infer<typeof createPropertySchema>
>;

export type CreateUnitSchema = z.infer<typeof createUnitSchema>;

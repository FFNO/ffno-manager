import { z } from "zod";
import { RequestCategory } from "./requests.const";

export const createRequestSchema = z.object({
  name: z.string(),
  details: z.string(),
  category: z.nativeEnum(RequestCategory),
  receiverIds: z.array(z.string().uuid()).optional(),
  unitId: z.string().uuid().optional(),
  propertyId: z.string().uuid().optional(),
});

export type CreateRequestSchema = z.infer<typeof createRequestSchema>;

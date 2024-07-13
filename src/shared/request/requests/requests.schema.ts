import { RequestCategory } from '@/libs';
import { z } from 'zod';

export const createRequestSchema = z.object({
  name: z.string(),
  description: z.string(),
  category: z.nativeEnum(RequestCategory),
  receiverIds: z.array(z.string().uuid()).optional(),
  unitId: z.string().uuid().optional(),
  equipmentId: z.string().uuid().optional(),
  propertyId: z.string().uuid().optional(),
});

export type CreateRequestSchema = z.infer<typeof createRequestSchema>;

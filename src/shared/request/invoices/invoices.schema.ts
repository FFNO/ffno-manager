import dayjs from 'dayjs';
import { z } from 'zod';

export const createInvoiceSchema = z.object({
  amount: z.number(),
  dueDate: z.date().min(dayjs().startOf('day').toDate(), {
    message: 'Due date must be later or equal today',
  }),
  details: z.string().optional(),
  category: z.coerce.number(),
  unitId: z.string().uuid(),
  memberId: z.string().uuid(),
});

export type CreateInvoiceSchema = z.infer<typeof createInvoiceSchema>;

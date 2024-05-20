import { CreateInvoiceSchema } from './invoices.schema';

export const createInvoiceInitialValues: NullableObject<CreateInvoiceSchema> = {
  amount: 0,
  category: null,
  dueDate: null,
  memberId: null,
  unitId: null,
  description: null,
};

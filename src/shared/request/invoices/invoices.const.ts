import { invoiceCategoryRecord } from '@/libs';
import { getOptionListFromRecord } from '@/shared';
import { CreateInvoiceSchema } from './invoices.schema';

export const invoiceCategories = getOptionListFromRecord(invoiceCategoryRecord);

export const createInvoiceInitialValues: NullableObject<CreateInvoiceSchema> = {
  amount: 0,
  category: null,
  dueDate: null,
  memberId: null,
  unitId: null,
  details: null,
};

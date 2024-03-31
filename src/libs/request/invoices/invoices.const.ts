import { NullableObject, getOptionListFromRecord } from "@/libs";
import { CreateInvoiceSchema } from "./invoices.schema";

export enum InvoiceCategory {
  UNIT_CHARGE,
}

export const invoiceCategoryRecord: Record<InvoiceCategory, string> = {
  [InvoiceCategory.UNIT_CHARGE]: "Tiền phòng",
};

export const invoiceCategories = getOptionListFromRecord(invoiceCategoryRecord);

export const createInvoiceInitialValues: NullableObject<CreateInvoiceSchema> = {
  amount: 0,
  category: null,
  dueDate: null,
  memberId: null,
  unitId: null,
  details: null,
};

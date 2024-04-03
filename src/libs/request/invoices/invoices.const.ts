import { InvoiceCategory, NullableObject } from "../../common";
import { getOptionListFromRecord } from "../../utils";
import { CreateInvoiceSchema } from "./invoices.schema";

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

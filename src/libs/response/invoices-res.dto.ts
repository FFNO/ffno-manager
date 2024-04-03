export interface InvoiceResDto {
  id: string;
  status: number;
  amount: string;
  paidAt: Nullable<Date>;
  dueDate: Date;
  details: string;
  category: string;
  unitId: string;
  unit: string;
  memberId: string;
  member: string;
}

export interface GetListInvoiceResDto {
  data: InvoiceResDto[];
}

import { IGetListInvoiceDto } from '@/libs';
import { atom } from 'jotai';

export const initialInvoiceSearchValues: NullableObject<IGetListInvoiceDto> = {
  page: undefined,
  status: null,
  memberId: null,
  propertyId: null,
  unitId: null,
  categories: [],
};

export const invoiceSearchAtom = atom<NullableObject<IGetListInvoiceDto>>(
  initialInvoiceSearchValues,
);

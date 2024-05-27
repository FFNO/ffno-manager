import { ICreateContractDto, IGetListContractDto } from '@/libs';
import { atom } from 'jotai';

export const contractSearchAtom = atom<NullableObject<IGetListContractDto>>({});

export const contractFormAtom = atom<NullableObject<ICreateContractDto>>({
  unitId: null,
  tenantId: null,
  landlordId: null,
  startDate: null,
  endDate: null,
  terminationDate: null,
  imgUrls: [],
  template: 'basic',
});

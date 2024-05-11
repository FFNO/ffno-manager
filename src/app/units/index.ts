import { IGetListUnitDto } from '@/libs';
import { atom } from 'jotai';

export const initialUnitSearchValues: NullableObject<IGetListUnitDto> = {
  page: undefined,
  name: '',
  ward: null,
  district: null,
  province: null,
  features: [],
  amenities: [],
};

export const unitSearchAtom = atom<NullableObject<IGetListUnitDto>>(
  initialUnitSearchValues,
);

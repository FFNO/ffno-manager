import { IGetListPropertyDto } from '@/libs';
import { atom } from 'jotai';

export const initialPropertySearchValues: NullableObject<IGetListPropertyDto> =
  {
    page: undefined,
    type: null,
    name: undefined,
    ward: null,
    district: null,
    province: null,
    amenities: [],
  };

export const propertySearchAtom = atom<NullableObject<IGetListPropertyDto>>(
  initialPropertySearchValues,
);

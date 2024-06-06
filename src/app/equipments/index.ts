import { IGetListEquipmentDto } from '@/libs';
import { atom } from 'jotai';

export const equipmentSearchAtom = atom<NullableObject<IGetListEquipmentDto>>(
  {},
);

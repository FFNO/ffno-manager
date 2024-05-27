import { IGetListRequestDto } from '@/libs';
import { atom } from 'jotai';

export * from './form';

export const requestSearchAtom = atom<NullableObject<IGetListRequestDto>>({
  type: 'received',
});

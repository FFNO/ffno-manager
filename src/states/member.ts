import { MemberResDto } from '@/shared';
import { atomWithStorage } from 'jotai/utils';

export const memberAtom = atomWithStorage(
  'member',
  JSON.parse(localStorage.getItem('member') || '{}') as MemberResDto,
);

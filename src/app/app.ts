import { IMemberResDto } from '@/libs';
import { WritableAtom, atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export function atomWithToggle(
  initialValue?: boolean,
): WritableAtom<boolean, [boolean?], void> {
  const anAtom = atom(initialValue, (get, set, nextValue?: boolean) => {
    const update = nextValue ?? !get(anAtom);
    set(anAtom, update);
  });

  return anAtom as WritableAtom<boolean, [boolean?], void>;
}

export const isOpenBurgerAtom = atomWithToggle(true);

export const currentMemberAtom = atomWithStorage(
  'currentMember',
  JSON.parse(localStorage.getItem('currentMember') || '{}') as IMemberResDto,
);

export const contactRecordAtom = atom<Record<string, IMemberResDto>>({});

export const notificationCountAtom = atom<number>(0);

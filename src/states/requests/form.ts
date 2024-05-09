import { createRequestInitialValues } from '@/shared';
import { atom } from 'jotai';

export const requestFormAtom = atom(createRequestInitialValues);

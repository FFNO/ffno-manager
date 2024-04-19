import { createRequestInitialValues } from "@/libs";
import { atom } from "jotai";

export const requestFormAtom = atom(createRequestInitialValues);

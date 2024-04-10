import { MemberResDto } from "@/libs";
import { atom } from "jotai";

export const memberAtom = atom(
  JSON.parse(localStorage.getItem("member") || "{}") as Nullable<MemberResDto>
);

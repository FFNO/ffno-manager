import { MemberRole } from "../common";

export interface MemberResDto {
  id: string;
  name: string;
  email: string;
  phone: string;
  unit: string;
  imgUrl: string;
  role: MemberRole;
}

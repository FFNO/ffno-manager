import { MemberResDto } from "./members-res.dto";

export interface UnitResDto {
  id: string;
  name: string;
  tenants: MemberResDto[];
}

export interface GetListUnitResDto {
  data: UnitResDto[];
}

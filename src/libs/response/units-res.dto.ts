import { MemberResDto } from "./members-res.dto";

export interface UnitResDto {
  id: string;
  name: string;
  area: string;
  price: string;
  deposit: string;
  details: string;
  status: number;
  imgUrls: string[];
  unitFeatures: string[];
  tenants: MemberResDto[];
  payer: MemberResDto;
}

export interface GetListUnitResDto {
  data: UnitResDto[];
}

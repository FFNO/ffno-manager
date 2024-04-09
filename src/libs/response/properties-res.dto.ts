import { PropertyType } from "../request/properties";
import { MemberResDto } from "./members-res.dto";
import { UnitResDto } from "./units-res.dto";

export interface PropertyResDto {
  id: string;
  name: string;
  type: PropertyType;
  address: string;
  ward: string;
  district: string;
  province: string;
  imgUrls: string[];
  details: string;
  ownerId: string;
  owner: MemberResDto;
  amenities: string[];
  units: UnitResDto[];
  occupiedCount: number;
  vacantCount: number;
}

export interface GetListPropertyResDto {
  data: PropertyResDto[];
}

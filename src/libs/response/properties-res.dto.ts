import { UnitResDto } from "./units-res.dto";

export interface PropertyResDto {
  id: string;
  name: string;
  type: number;
  address: string;
  ward: string;
  district: string;
  province: string;
  imgUrls: string[];
  details: string;
  ownerId: string;
  amenities: string[];
  units: UnitResDto[];
  occupiedCount: number;
  vacantCount: number;
}

export interface GetListPropertyResDto {
  data: PropertyResDto[];
}

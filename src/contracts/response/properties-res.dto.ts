export interface PropertyResDto {
  amenities: string[];
  id: string;
  name: string;
  type: number;
  address: string;
  ward: string;
  district: string;
  province: string;
  imgUrls: string[];
  ownerId: string;
  details?: string;
}

export interface GetListPropertyResDto {
  data: PropertyResDto[];
}

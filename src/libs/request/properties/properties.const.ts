import { getOptionListFromRecord } from "@/libs";
import { CreatePropertySchema, CreateUnitSchema } from "./properties.schema";

export enum PropertyType {
  SINGLE_UNIT,
  MULTIPLE_UNIT,
}

export enum UnitStatus {
  GOOD,
  MAINTAINING,
  BAD,
}

export const propertyTypeRecord: Record<PropertyType, string> = {
  [PropertyType.SINGLE_UNIT]: "Nhà nguyên căn",
  [PropertyType.MULTIPLE_UNIT]: "Nhiều phòng",
};

export const unitStatusRecord: Record<UnitStatus, string> = {
  [UnitStatus.GOOD]: "Tốt",
  [UnitStatus.MAINTAINING]: "Đang bảo trì",
  [UnitStatus.BAD]: "Có vấn đề",
};

export const propertyTypes = getOptionListFromRecord(propertyTypeRecord);

export const unitStatuses = getOptionListFromRecord(unitStatusRecord);

export const createUnitInitialValues: CreateUnitSchema = {
  name: "Phòng 1",
  area: 0,
  deposit: 0,
  price: 0,
  details: "",
  status: String(UnitStatus.GOOD),
};

export const createPropertyFormInitialValues: CreatePropertySchema = {
  type: "0",
  name: "",
  address: "",
  province: null,
  district: null,
  ward: null,
  amenities: [],
  units: [createUnitInitialValues],
};

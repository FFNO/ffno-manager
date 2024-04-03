import { getOptionListFromRecord } from "@/libs";
import { CreatePropertySchema, CreateUnitSchema } from "./properties.schema";

export enum PropertyType {
  SINGLE_UNIT,
  MULTIPLE_UNIT,
}

export const propertyTypeRecord: Record<PropertyType, string> = {
  [PropertyType.SINGLE_UNIT]: "Nhà nguyên căn",
  [PropertyType.MULTIPLE_UNIT]: "Nhiều phòng",
};

export const propertyTypes = getOptionListFromRecord(propertyTypeRecord);

export const createUnitInitialValues: CreateUnitSchema = {
  name: "Phòng 1",
  area: 0,
  deposit: 0,
  price: 0,
  details: "",
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

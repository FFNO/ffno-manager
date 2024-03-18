import { CreatePropertySchema, CreateUnitSchema } from "./properties.schema";

export const createUnitInitialValues: CreateUnitSchema = {
  name: "Unit 1",
  area: 0,
  deposit: 0,
  price: 0,
  type: "0",
  details: "",
  beds: "NONE",
  baths: "NONE",
  parking: "FREE",
  laundry: "NONE",
  airConditioning: "NONE",
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

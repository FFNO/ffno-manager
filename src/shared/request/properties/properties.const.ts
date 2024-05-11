import { PropertyType, UnitStatus } from '@/libs';
import { CreatePropertySchema, CreateUnitSchema } from './properties.schema';

export const createUnitInitialValues: CreateUnitSchema = {
  name: '1',
  area: 0,
  deposit: 0,
  price: 0,
  details: '',
  status: UnitStatus.GOOD,
};

export const createPropertyFormInitialValues: CreatePropertySchema = {
  type: PropertyType.SINGLE_UNIT,
  name: '',
  address: '',
  province: null,
  district: null,
  ward: null,
  amenities: [],
  units: [createUnitInitialValues],
};

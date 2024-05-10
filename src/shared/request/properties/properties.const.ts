import { UnitStatus } from '@/libs';
import { CreatePropertySchema, CreateUnitSchema } from './properties.schema';

export const createUnitInitialValues: CreateUnitSchema = {
  name: 'Phòng 1',
  area: 0,
  deposit: 0,
  price: 0,
  details: '',
  status: String(UnitStatus.GOOD),
};

export const createPropertyFormInitialValues: CreatePropertySchema = {
  type: '0',
  name: '',
  address: '',
  province: null,
  district: null,
  ward: null,
  amenities: [],
  units: [createUnitInitialValues],
};

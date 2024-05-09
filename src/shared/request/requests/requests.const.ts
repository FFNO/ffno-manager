import { RequestCategory, requestCategoryRecord } from '@/libs';
import { getOptionListFromRecord } from '@/shared';
import { CreateRequestSchema } from './requests.schema';

export const requestCategories = getOptionListFromRecord(requestCategoryRecord);

export const createRequestInitialValues: NullableObject<CreateRequestSchema> = {
  name: '',
  details: '',
  category: RequestCategory.UNIT_LEASE,
  receiverIds: [],
};

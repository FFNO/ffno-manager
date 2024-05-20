import { RequestCategory } from '@/libs';
import { CreateRequestSchema } from './requests.schema';

export const createRequestInitialValues: NullableObject<CreateRequestSchema> = {
  name: '',
  description: '',
  category: RequestCategory.UNIT_LEASE,
  receiverIds: [],
};

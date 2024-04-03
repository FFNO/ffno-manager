import { getOptionListFromRecord } from "@/libs";
import { CreateRequestSchema } from "./requests.schema";

export enum RequestCategory {
  UNIT_LEASE,
}

export const requestCategoryRecord: Record<RequestCategory, string> = {
  [RequestCategory.UNIT_LEASE]: "Thuê phòng",
};

export const requestCategories = getOptionListFromRecord(requestCategoryRecord);

export const createRequestInitialValues: NullableObject<CreateRequestSchema> = {
  name: "",
  details: "",
  category: String(RequestCategory.UNIT_LEASE),
  receiverIds: [],
};

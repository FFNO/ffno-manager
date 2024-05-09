import { genderRecord, memberRoleRecord } from '@/libs';
import { getOptionListFromRecord } from '@/shared/utils';

export const genders = getOptionListFromRecord(genderRecord);

export const memberRoles = getOptionListFromRecord(memberRoleRecord);

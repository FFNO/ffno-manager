import { Gender, MemberRole } from '@/shared/common';
import { getOptionListFromRecord } from '@/shared/utils';

export const genderRecord: Record<Gender, string> = {
  [Gender.MALE]: 'Nam',
  [Gender.FEMALE]: 'Nữ',
};

export const memberRoleRecord: Record<MemberRole, string> = {
  [MemberRole.ADMIN]: 'Admin',
  [MemberRole.LANDLORD]: 'Chủ đất',
  [MemberRole.TENANT]: 'Người thuê',
  [MemberRole.SERVICE_WORKER]: 'Dịch vụ',
};

export const genders = getOptionListFromRecord(genderRecord);

export const memberRoles = getOptionListFromRecord(memberRoleRecord);

import { RequestStatus } from '../common';
import { RequestCategory } from '../request';
import { MemberResDto } from './members-res.dto';
import { UnitResDto } from './units-res.dto';

export interface RequestResDto {
  id: string;
  name: string;
  details: string;
  status: RequestStatus;
  category: RequestCategory;
  unit?: UnitResDto;
  sender: MemberResDto;
  senderId: string;
  receivers: { status: RequestStatus; updatedAt: Date; member: MemberResDto }[];
  approvers: MemberResDto[];
  approverIds: string[];
  createdAt: string;
}

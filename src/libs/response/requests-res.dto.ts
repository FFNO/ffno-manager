import { RequestCategory } from "../request";
import { MemberResDto } from "./members-res.dto";
import { UnitResDto } from "./units-res.dto";

export interface RequestResDto {
  id: string;
  name: string;
  details: string;
  status: number;
  category: RequestCategory;
  unit?: UnitResDto;
  sender: MemberResDto;
  senderId: string;
  receivers: MemberResDto[];
  createdAt: string;
}

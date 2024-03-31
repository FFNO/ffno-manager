import { MemberResDto } from "./members-res.dto";

export interface RequestResDto {
  id: string;
  name: string;
  details: string;
  status: number;
  category: number;
  sender: MemberResDto;
  senderId: string;
  receiver: MemberResDto;
  receiverId: string;
}

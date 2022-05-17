import { Document } from "mongoose";

export class FriendRequestEntity extends Document{
  readonly senderUsername: string;
  readonly receiverUsername: string;
  readonly isAccepted: boolean;
}
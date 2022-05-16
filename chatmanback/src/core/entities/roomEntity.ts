import { Document } from 'mongoose';

export class RoomEntity extends Document {
  readonly roomName: string;
  readonly roomCreator: string;
}

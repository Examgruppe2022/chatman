import { Document } from 'mongoose';

export class roomEntity extends Document {
  readonly roomName: string;
  readonly roomCreator: string;
}

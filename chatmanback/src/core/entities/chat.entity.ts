import { Document } from 'mongoose';

export class Chat extends Document {
  readonly text: string;
  readonly sender: string;
  readonly room: string;
  readonly timeStamp: Date;
}

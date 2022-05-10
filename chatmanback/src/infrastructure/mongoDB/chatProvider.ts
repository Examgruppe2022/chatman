import { Connection } from 'mongoose';
import { ChatSchema } from './chatSchema';
export const chatProvider = [
  {
    provide: 'CHAT_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Chat', ChatSchema),
    inject: ['MONGO_DATABASE_CONNECTION'],
  },
];

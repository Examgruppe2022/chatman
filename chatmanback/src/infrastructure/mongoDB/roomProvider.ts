import { Connection } from 'mongoose';
import { RoomSchema } from './roomSchema';
export const roomProvider = [
  {
    provide: 'ROOM_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Room', RoomSchema),
    inject: ['MONGO_DATABASE_CONNECTION'],
  },
];

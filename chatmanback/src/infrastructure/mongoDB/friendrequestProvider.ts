import { Connection } from 'mongoose';
import { FriendRequestSchema } from './friendrequestSchema';
export const friendrequestProvider = [
  {
    provide: 'FRIENDREQUEST_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('FriendRequest', FriendRequestSchema),
    inject: ['MONGO_DATABASE_CONNECTION'],
  },
];

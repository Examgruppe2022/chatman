import { FriendRequest } from '../../core/entities/friend-request.entity';
import mongoose from "mongoose";

export const FriendRequestSchema = new mongoose.Schema({
  name: 'FriendRequest',
  target: FriendRequest,
  columns: {
    uuid: {
      type: 'uuid',
      generated: 'uuid',
      primary: true,
    },
    sentUserUuid: {
      type: 'varchar',
    },
    sentUserName: {
      type: 'varchar',
    },
    receivedUserUuid: {
      type: 'varchar',
    },
    isAccepted: {
      type: 'boolean',
    },
  },
  relations: {},
});
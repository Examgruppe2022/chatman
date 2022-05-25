import { FriendRequestEntity } from '../../core/entities/friend-request.entity';
import mongoose from 'mongoose';

export const FriendRequestSchema = new mongoose.Schema({
  senderUsername: String,
  receiverUsername: String,
  isAccepted: Boolean,
});

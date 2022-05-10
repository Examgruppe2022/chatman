import * as mongoose from 'mongoose';

export const RoomSchema = new mongoose.Schema({
  roomName: {
    type: String,
    unique: true,
  },
  roomCreator: String,
});

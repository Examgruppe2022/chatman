import * as mongoose from 'mongoose';

export const ChatSchema = new mongoose.Schema({
  text: String,
  sender: String,
  room: String,
  timeStamp: Date,
});

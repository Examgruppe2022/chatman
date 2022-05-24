import { Inject, Injectable } from '@nestjs/common';
import { CreateChatDto } from '../../chats/dto/create-chat.dto';
import { UpdateChatDto } from '../../chats/dto/update-chat.dto';
import { Model } from 'mongoose';
import { RoomEntity } from '../../core/entities/roomEntity';
import { ChatEntity } from '../../core/entities/chat.entity';

@Injectable()
export class ChatsService {
  constructor(
    @Inject('ROOM_MODEL') private readonly roomModel: Model<RoomEntity>,
    @Inject('CHAT_MODEL') private readonly chatModel: Model<ChatEntity>,
  ) {}

  saveChat(chat: CreateChatDto) {
    const newChat = new this.chatModel({
      text: chat.text,
      sender: chat.sender,
      room: chat.room,
      timeStamp: new Date(),
    });
    return newChat.save();
  }

  async getChatsFromRoom(roomNameInput: string) {
    const chatList: ChatEntity[] = [];
    const isRoomReal = await this.verifyRoom(roomNameInput);
    if (isRoomReal == true) {
      const chats = await this.chatModel.find({ room: roomNameInput });
      chats.forEach(function (chat) {
        chatList.push(chat);
      });
      return chatList;
    } else {
      throw new Error('there is no such room');
    }
  }

  //this method verifies if a room is present in the DB, it ensures that no chats are made to non-exsistant rooms
  async verifyRoom(roomNameInput: string) {
    const room = await this.roomModel.findOne({ roomName: roomNameInput });
    if (room) {
      return true;
    } else {
      return false;
    }
  }
}

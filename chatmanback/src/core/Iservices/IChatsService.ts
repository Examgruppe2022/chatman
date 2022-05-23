import { CreateChatDto } from '../../chats/dto/create-chat.dto';

export interface IChatsService {
  saveChat(chat: CreateChatDto);

  getChatsFromRoom(roomNameInput: string);

  verifyRoom(roomNameInput: string);
}

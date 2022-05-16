import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { ChatsService } from '../domain/services/chats.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { Server } from 'socket.io';

@WebSocketGateway()
export class ChatsGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatsService: ChatsService) {}

  @SubscribeMessage('createChat')
  create(@MessageBody() createChatDto: CreateChatDto) {
    this.chatsService.saveChat(createChatDto);
    this.server.emit(createChatDto.room, createChatDto);
  }
}

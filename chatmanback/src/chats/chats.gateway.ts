import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { ChatsService } from '../domain/services/chats.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { Server } from 'socket.io';
import { Inject } from '@nestjs/common';
import { IChatsService } from '../core/Iservices/IChatsService';

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatsGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    @Inject('IChatsService') private readonly chatsService: IChatsService,
  ) {}

  @SubscribeMessage('createChat')
  create(@MessageBody() createChatDto: CreateChatDto) {
    this.chatsService.saveChat(createChatDto);
    this.server.emit(createChatDto.room, createChatDto);
  }
}

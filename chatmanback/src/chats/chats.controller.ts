import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';
import { ChatsService } from '../domain/services/chats.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { StringDto } from '../universalDtos/string.dto';
import { IChatsService } from '../core/Iservices/IChatsService';

@Controller()
export class ChatsController {
  constructor(
    @Inject('IChatsService') private readonly chatService: IChatsService,
  ) {}

  @Post()
  getChatsFromRoom(@Body() roomName: StringDto) {
    return this.chatService.getChatsFromRoom(roomName.text);
  }
}

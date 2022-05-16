import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ChatsService } from '../domain/services/chats.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { StringDto } from '../universalDtos/string.dto';

@Controller()
export class ChatsController {
  constructor(private readonly chatService: ChatsService) {}

  @Post()
  getChatsFromRoom(@Body() roomName: StringDto) {
    return this.chatService.getChatsFromRoom(roomName.text);
  }
}

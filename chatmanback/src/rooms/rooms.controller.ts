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
import { RoomsService } from '../domain/services/rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { StringDto } from '../universalDtos/string.dto';
import { TwoStringDto } from '../universalDtos/twoString.dto';
import { IRoomsService } from '../core/Iservices/IRoomsService';

@Controller('rooms')
export class RoomsController {
  constructor(
    @Inject('IRoomService') private readonly roomsService: IRoomsService,
  ) {}

  @Post('createRoom')
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomsService.create(createRoomDto);
  }

  @Post('ownRoom')
  findUsersOwnRooms(@Body() username: StringDto) {
    return this.roomsService.findUsersOwnRooms(username.text);
  }

  @Post('allAccessibleRooms')
  findallAccessibleRooms(@Body() username: StringDto) {
    return this.roomsService.findAllAccessibleRooms(username.text);
  }

  @Post('friendsRooms')
  findFriendsRooms(@Body() username: StringDto) {
    return this.roomsService.findFriendsRooms(username.text);
  }

  @Post('delete')
  remove(@Body() roomName: StringDto) {
    return this.roomsService.remove(roomName.text);
  }
}

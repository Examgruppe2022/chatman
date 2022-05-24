import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  UseGuards,
} from '@nestjs/common';
import { RoomsService } from '../domain/services/rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { StringDto } from '../universalDtos/string.dto';
import { TwoStringDto } from '../universalDtos/twoString.dto';
import { IRoomsService } from '../core/Iservices/IRoomsService';
import { JwtAuthGuard } from '../loginAndUser/Jwt-auth.Guard';

@Controller('rooms')
export class RoomsController {
  constructor(
    @Inject('IRoomService') private readonly roomsService: IRoomsService,
  ) {}


  @Post('createRoom')
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomsService.create(createRoomDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('ownRoom')
  findUsersOwnRooms(@Body() username: StringDto) {
    return this.roomsService.findUsersOwnRooms(username.text);
  }

  @UseGuards(JwtAuthGuard)
  @Post('allAccessibleRooms')
  findallAccessibleRooms(@Body() username: StringDto) {
    return this.roomsService.findAllAccessibleRooms(username.text);
  }

  @UseGuards(JwtAuthGuard)
  @Post('friendsRooms')
  findFriendsRooms(@Body() username: StringDto) {
    return this.roomsService.findFriendsRooms(username.text);
  }

  @UseGuards(JwtAuthGuard)
  @Post('delete')
  remove(@Body() roomName: StringDto) {
    return this.roomsService.remove(roomName.text);
  }
}

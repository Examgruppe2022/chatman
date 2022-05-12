import { Inject, Injectable } from '@nestjs/common';
import { CreateRoomDto } from '../../rooms/dto/create-room.dto';
import { UpdateRoomDto } from '../../rooms/dto/update-room.dto';
import { Model } from 'mongoose';
import { userEntity } from '../../core/entities/user.entity';
import { roomEntity } from '../../core/entities/room.entity';

@Injectable()
export class RoomsService {
  constructor(
    @Inject('ROOM_MODEL') private readonly roomModel: Model<roomEntity>,
    @Inject('USER_MODEL') private readonly userModel: Model<userEntity>,
  ) {}

  async create(createRoomDto: CreateRoomDto) {
    const newRoom = new this.roomModel({
      roomName: createRoomDto.roomName,
      roomCreator: createRoomDto.roomCreator,
    });
    const creator = await this.userModel.findOne({
      username: newRoom.roomCreator,
    });
    if (creator) {
      return await newRoom.save();
    } else {
      throw new Error('no such user!');
    }
  }

  findAll() {
    return `This action returns all rooms`;
  }

  findOne(id: number) {
    return `This action returns a #${id} room`;
  }

  update(id: number, updateRoomDto: UpdateRoomDto) {
    return `This action updates a #${id} room`;
  }

  remove(id: number) {
    return `This action removes a #${id} room`;
  }
}

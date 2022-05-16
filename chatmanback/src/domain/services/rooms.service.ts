import { Inject, Injectable } from '@nestjs/common';
import { CreateRoomDto } from '../../rooms/dto/create-room.dto';
import { UpdateRoomDto } from '../../rooms/dto/update-room.dto';
import { Model } from 'mongoose';
import { userEntity } from '../../core/entities/user.entity';
import { RoomEntity } from '../../core/entities/roomEntity';

@Injectable()
export class RoomsService {
  constructor(
    @Inject('ROOM_MODEL') private readonly roomModel: Model<RoomEntity>,
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
      throw new Error('no such user! a valid user is needed to create a room');
    }
  }

  async findUsersOwnRooms(username: string) {
    const roomsList: RoomEntity[] = [];
    const ownRooms = await this.roomModel.find({ roomCreator: username });
    ownRooms.forEach(function (room) {
      roomsList.push(
        new RoomEntity({
          roomName: room.roomName,
          roomCreator: room.roomCreator,
        }),
      );
    });
    return roomsList;
  }

  remove(roomname: string) {
    return this.roomModel.findOneAndRemove({ roomName: roomname });
  }

  async findAllAccessibleRooms(username: string) {
    const user = await this.userModel.findOne({ username: username });
    const accesibleRooms: RoomEntity[] = [];
    const ownRooms = await this.findUsersOwnRooms(user.username);
    ownRooms.forEach(function (room) {
      accesibleRooms.push(room);
    });
    const friendsRooms = await this.findFriendsRooms(user.username);
    friendsRooms.forEach(function (room) {
      accesibleRooms.push(room);
    });
    return accesibleRooms;
  }

  async findFriendsRooms(username: string) {
    const user = await this.userModel.findOne({ username: username });
    const friendsRoomsReturn: RoomEntity[] = [];
    for (const friend of user.friends) {
      const friendsRooms = await this.roomModel.find({ roomCreator: username });
      friendsRooms.forEach(function (room) {
        friendsRoomsReturn.push(
          new RoomEntity({
            roomName: room.roomName,
            roomCreator: room.roomCreator,
          }),
        );
      });
    }
    return friendsRoomsReturn;
  }
}

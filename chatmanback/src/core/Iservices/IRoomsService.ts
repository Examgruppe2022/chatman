import { CreateRoomDto } from '../../rooms/dto/create-room.dto';

export interface IRoomsService {
  create(createRoomDto: CreateRoomDto);

  findUsersOwnRooms(username: string);

  remove(roomName: string);

  findAllAccessibleRooms(username: string);

  findFriendsRooms(username: string);
}

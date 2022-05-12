import { ApiProperty } from '@nestjs/swagger';

export class CreateRoomDto {
  @ApiProperty()
  roomName: string;
  @ApiProperty()
  roomCreator: string;
}

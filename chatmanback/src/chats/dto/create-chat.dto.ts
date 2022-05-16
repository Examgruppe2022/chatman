import { ApiProperty } from '@nestjs/swagger';

export class CreateChatDto {
  @ApiProperty()
  text: string;
  @ApiProperty()
  sender: string;
  @ApiProperty()
  room: string;
  @ApiProperty()
  timeStamp: Date;
}

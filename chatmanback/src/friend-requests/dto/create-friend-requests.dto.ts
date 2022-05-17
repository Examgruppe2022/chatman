import { ApiProperty } from '@nestjs/swagger';

export class CreateFriendRequestDto {
  @ApiProperty()
  senderUsername: string;
  @ApiProperty()
  receiverUsername: string;
}

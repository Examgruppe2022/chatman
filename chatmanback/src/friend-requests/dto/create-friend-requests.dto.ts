import { ApiProperty } from '@nestjs/swagger';

export class CreateFriendRequestDto {
  @ApiProperty()
  sentUserUuid: string;
  @ApiProperty()
  sentUserName: string;
  @ApiProperty()
  receivedUserUuid: string;
  @ApiProperty()
  isAccepted: boolean;
}

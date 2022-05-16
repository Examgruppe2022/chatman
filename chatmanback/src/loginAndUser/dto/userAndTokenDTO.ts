import { ApiProperty } from '@nestjs/swagger';
import { userEntity } from '../../core/entities/user.entity';
import { LoginDto } from "./login.dto";

export class UserAndTokenDTO {
  @ApiProperty()
  loginUser: LoginDto;
  @ApiProperty()
  token: { access_token: string };
}

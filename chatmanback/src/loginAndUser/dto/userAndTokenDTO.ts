import { ApiProperty } from '@nestjs/swagger';
import { LoginDto } from './login.dto';

export class UserAndTokenDTO {
  @ApiProperty()
  loginUser: LoginDto;
  @ApiProperty()
  token: string;
}

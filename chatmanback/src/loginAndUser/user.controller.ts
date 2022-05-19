import { UserService } from '../domain/services/user.service';
import { Body, Get, Post } from '@nestjs/common';
import { UserEntity } from '../core/entities/User.Entity';
import { StringDto } from '../universalDtos/string.dto';
import { LoginDto } from './dto/login.dto';

export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/getAllOtherUsers')
  getAllUsers(@Body() myUsername: StringDto): Promise<UserEntity[]> {
    return this.userService.getAllExceptMe(myUsername.text);
  }
  @Post('/getMe')
  getMe(@Body() login: LoginDto) {
    return this.userService.getMe(login.username);
  }
}

import { UserService } from '../domain/services/user.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserEntity } from '../core/entities/User.Entity';
import { StringDto } from '../universalDtos/string.dto';
import { LoginDto } from './dto/login.dto';

@Controller('/user')
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

  @Post('/friends')
  getFriends(@Body() username: StringDto) {
    return this.userService.getFriends(username.text);
  }

  @Post('/getNonFriends')
  getNonFriends(@Body() username: StringDto) {
    return this.userService.getNonFriends(username.text);
  }
}

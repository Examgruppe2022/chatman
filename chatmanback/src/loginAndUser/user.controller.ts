import { UserService } from '../domain/services/user.service';
import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { UserEntity } from '../core/entities/User.Entity';
import { StringDto } from '../universalDtos/string.dto';
import { LoginDto } from './dto/login.dto';
import { IUserService } from '../core/Iservices/IUserService';
import { TwoStringDto } from '../universalDtos/twoString.dto';

@Controller('/user')
export class UserController {
  constructor(
    @Inject('IUserService') private readonly userService: IUserService,
  ) {}

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
  async getNonFriends(@Body() username: TwoStringDto) {
    const returnData = await this.userService.getNonFriends(
      username.firstString,
      username.secondString,
    );
    console.log(returnData);
    return returnData;
  }
}

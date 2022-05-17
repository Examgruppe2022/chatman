import { UserService } from '../domain/services/user.service';
import { Body, Get } from '@nestjs/common';
import { UserEntity } from '../core/entities/User.Entity';

export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAllUsers(@Body() input: string): Promise<UserEntity[]> {
    return this.userService.getAllFromInput();
  }
}

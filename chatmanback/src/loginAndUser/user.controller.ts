import { UserService } from '../domain/services/user.service';
import { Body, Get } from '@nestjs/common';
import { userEntity } from '../core/entities/user.entity';

export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAllUsers(@Body() input: string): Promise<userEntity[]> {
    return this.userService.getAllFromInput();
  }
}

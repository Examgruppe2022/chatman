import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { LoginService } from '../domain/services/login.service';
import { RegistrationDto } from './dto/registration.dto';
import { LocalAuthGuard } from './local-auth.guard';
import { LoginDto } from './dto/login.dto';
import { UserEntity } from '../core/entities/User.Entity';
import { JwtAuthGuard } from './Jwt-auth.Guard';

@Controller('auth')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('/register')
  async create(@Body() registerDTO: RegistrationDto) {
    this.loginService.create(registerDTO).then((newUser) => {
      return 'user created';
    });
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.loginService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  getUser(@Request() req) {
    return req.user;
  }
}

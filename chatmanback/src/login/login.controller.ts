import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { LoginService } from '../domain/services/login.service';
import { LoginDto } from './dto/login.dto';
import { RegistrationDto } from './dto/registration.dto';
import { UserAndTokenDTO } from './dto/userAndTokenDTO';
import { LocalAuthGuard } from './local-auth.guard';
import { userEntity } from "../core/entities/user.entity";

@Controller('auth')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('/register')
  async create(@Body() registerDTO: RegistrationDto) {
    this.loginService.create(registerDTO).then((newUser) => {
      return 'user created';
    });
  }
  /*
  @Post()
  async login(@Body() loginDTO: LoginDto): Promise<UserAndTokenDTO> {
    const user = await this.loginService.validateUser(loginDTO);
    const uatdto = new UserAndTokenDTO();
    uatdto.loginUser = user;
    uatdto.token = 'temp';
    return uatdto;
  }

    @Post('/login')
    login(@Body() loginDTO: LoginDto) {
      return this.loginService.validateUser(loginDTO);
    }
    */

  @Post('login')
  async login(@Body() loginDTO: LoginDto) {
    return this.loginService.validateUser(loginDTO);
  }
}

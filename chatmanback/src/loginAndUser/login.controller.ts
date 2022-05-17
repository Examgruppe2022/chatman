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
import { userEntity } from '../core/entities/user.entity';
import { Interceptor } from '../loginAndUser/Interceptor';
import { promises } from 'dns';

@Controller('auth')
export class LoginController {
  constructor(
    private readonly loginService: LoginService,
    private readonly interceptor: Interceptor,
  ) {}

  @Post('/register')
  async create(@Body() registerDTO: RegistrationDto) {
    this.loginService.create(registerDTO).then((newUser) => {
      return 'user created';
    });
  }
  /*
  @Post()
  async loginAndUser(@Body() loginDTO: LoginDto): Promise<UserAndTokenDTO> {
    const user = await this.loginService.validateUser(loginDTO);
    const uatdto = new UserAndTokenDTO();
    uatdto.loginUser = user;
    uatdto.token = 'temp';
    return uatdto;
  }

    @Post('/loginAndUser')
    loginAndUser(@Body() loginDTO: LoginDto) {
      return this.loginService.validateUser(loginDTO);
    }
    */

  @Post('login')
  async login(@Body() loginDTO: LoginDto): Promise<UserAndTokenDTO> {
    const tokenToAdd = await this.loginService.validateUser(loginDTO);
    const user = loginDTO;
    const utDTO = new UserAndTokenDTO();
    utDTO.loginUser = user;
    utDTO.token = tokenToAdd;
    return utDTO;
  }
}

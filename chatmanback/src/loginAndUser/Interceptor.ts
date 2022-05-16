import { UserAndTokenDTO } from './dto/userAndTokenDTO';
import { LoginDto } from './dto/login.dto';
import { LoginService } from '../domain/services/login.service';
import { Injectable } from '@nestjs/common';

export class Interceptor {
  constructor(private readonly logServ: LoginService) {}

  async attachToken(logindto: LoginDto): Promise<UserAndTokenDTO> {
    const token = await this.logServ.validateUser(logindto);
    let utDTO: UserAndTokenDTO;
    utDTO.token = token;
    utDTO.loginUser = logindto;
    return utDTO;
  }

  detachToken() {}
}

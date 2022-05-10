import { userEntity } from '../../core/entities/user.entity';
import { Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';

export class UserService {
  constructor(
    @Inject('USER_MODEL') private readonly userModel: Model<userEntity>,
    private jwtService: JwtService,
  ) {}

  async getAllFromInput() {
    return this.userModel.find();
  }
}

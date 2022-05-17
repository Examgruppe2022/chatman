import { UserEntity } from '../../core/entities/User.Entity';
import { Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';

export class UserService {
  constructor(
    @Inject('USER_MODEL') private readonly userModel: Model<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async getAllFromInput() {
    return this.userModel.find();
  }
}

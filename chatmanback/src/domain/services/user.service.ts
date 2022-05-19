import { UserEntity } from '../../core/entities/User.Entity';
import { Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';

export class UserService {
  constructor(
    @Inject('USER_MODEL') private readonly userModel: Model<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async getAllExceptMe(myUsername: string) {
    const allUsers = await this.userModel.find();
    const allUsersMinusMe: UserEntity[] = [];
    allUsers.forEach(function (user) {
      if (user.username != myUsername) {
        allUsersMinusMe.push(
          new UserEntity({
            username: user.username,
            email: user.email,
            password: user.password,
            friends: user.friends,
          }),
        );
      }
    });
    return allUsersMinusMe;
  }

  async getMe(username: string) {
    const me = await this.userModel.findOne({ username: username });
    return me;
  }
}

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
    return new UserEntity({
      username: me.username,
      email: me.email,
      password: me.password,
      friends: me.friends,
    });
  }

  async getFriends(username: string) {
    const me = await this.getMe(username);
    const myFriends: UserEntity[] = [];
    me.friends.forEach(function (friend) {
      myFriends.push(this.getMe(friend));
    });
    return myFriends;
  }

  async getNonFriends(username: string) {
    const me = await this.getMe(username);
    const everyone = await this.getAllExceptMe(username);
    const returnList: UserEntity[] = [];
    everyone.forEach(function (user) {
      me.friends.forEach(function (friend) {
        if (user.username != friend) {
          returnList.push(user);
        }
      });
    });
    return returnList;
  }
}

import { UserEntity } from '../../core/entities/User.Entity';
import { Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { IUserService } from '../../core/Iservices/IUserService';

export class UserService implements IUserService {
  constructor(
    @Inject('USER_MODEL') private readonly userModel: Model<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async getAllExceptMe(myUsername: string) {
    const allUsers = await this.userModel.find();
    const allUsersMinusMe: UserEntity[] = [];
    allUsers.forEach(function (user) {
      if (user.username != myUsername) {
        allUsersMinusMe.push(user);
      }
    });
    return allUsersMinusMe;
  }

  async getMe(username: string): Promise<UserEntity> {
    const me = await this.userModel.findOne({ username: username });
    return me;
  }

  async getFriends(username: string): Promise<UserEntity[]> {
    const me = await this.getMe(username);
    const myFriends: UserEntity[] = [];
    for (const friend of me.friends) {
      myFriends.push(await this.userModel.findOne({ username: friend }));
    }
    return myFriends;
  }

  async getNonFriends(username: string, search: string): Promise<UserEntity[]> {
    const me = await this.getMe(username);
    const everyone = await this.getAllExceptMe(username);
    const returnList: UserEntity[] = [];
    everyone.forEach(function (user) {
      me.friends.forEach(function (friend) {
        if (user.username != friend && user.username.includes(search) == true) {
          returnList.push(user);
        }
      });
    });
    console.log(returnList);
    return returnList;
  }
}

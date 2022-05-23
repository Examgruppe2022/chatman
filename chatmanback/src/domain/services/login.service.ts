import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from '../../loginAndUser/dto/login.dto';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { RegistrationDto } from '../../loginAndUser/dto/registration.dto';
import { UserEntity } from '../../core/entities/User.Entity';
import { JwtService } from '@nestjs/jwt';
import { UserAndTokenDTO } from '../../loginAndUser/dto/userAndTokenDTO';
import { ILoginService } from '../../core/Iservices/ILoginService';

@Injectable()
export class LoginService implements ILoginService {
  constructor(
    @Inject('USER_MODEL') private readonly userModel: Model<UserEntity>,
    private jwtService: JwtService,
  ) {}

  //this method registers a user
  async create(createUserDto: RegistrationDto) {
    this.userModel.find().then((allUsers) => {
      allUsers.forEach(function (user) {
        if (
          user.email == createUserDto.email ||
          user.username == createUserDto.username
        ) {
          throw new Error('email or username already in use');
        }
      });
    });
    const generatedSalt = await bcrypt.genSalt();
    this.hashPassword(createUserDto.password, generatedSalt).then(
      (hashedPassword) => {
        const newUser = new this.userModel({
          username: createUserDto.username,
          email: createUserDto.email,
          password: hashedPassword,
        });
        newUser.save();
      },
    );
  }

  //this method hashes a password using a salt, it is used when creating an account and logging in
  async hashPassword(password: string, salt: string): Promise<string> {
    return await bcrypt.hash(password, salt);
  }

  //this compares 2 passwords, and returns a user if the password was correct.
  async validateUser(username: string, password: string) {
    const userFromDb = await this.getUser(username, password);
    const rightPassword = await bcrypt.compare(password, userFromDb.password);
    if (rightPassword) {
      return userFromDb;
    } else {
      throw new UnauthorizedException();
    }
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async getUser(username: string, password: string): Promise<UserEntity> {
    return await this.userModel
      .findOne({
        username: username,
      })
      .exec();
  }
}

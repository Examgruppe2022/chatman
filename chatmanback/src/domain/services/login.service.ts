import { Inject, Injectable } from '@nestjs/common';
import { LoginDto } from '../../loginAndUser/dto/login.dto';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { RegistrationDto } from '../../loginAndUser/dto/registration.dto';
import { userEntity } from '../../core/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginService {
  constructor(
    @Inject('USER_MODEL') private readonly userModel: Model<userEntity>,
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
  async validateUser(loginDTO: LoginDto) {
    const userFromDb = await this.getUser(loginDTO);
    const rightPassword = await bcrypt.compare(
      loginDTO.password,
      userFromDb.password,
    );
    if (rightPassword == true) {
      const payload = { username: loginDTO.username };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } else {
      throw new Error('The entered password was wrong password');
    }
  }

  async getUser(loginDTO: LoginDto): Promise<userEntity> {
    return await this.userModel
      .findOne({
        username: loginDTO.username,
      })
      .exec();
  }
}

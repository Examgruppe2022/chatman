import { RegistrationDto } from '../../loginAndUser/dto/registration.dto';
import { UserEntity } from '../entities/User.Entity';

export interface ILoginService {
  create(createUserDto: RegistrationDto);

  validateUser(username: string, password: string);

  login(user: any);

  getUser(username: string, password: string): Promise<UserEntity>;
}

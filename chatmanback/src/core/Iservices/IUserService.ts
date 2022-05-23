import { UserEntity } from '../entities/User.Entity';

export interface IUserService {
  getAllExceptMe(myUsername: string);

  getMe(username: string): Promise<UserEntity>;

  getFriends(username: string): Promise<UserEntity[]>;

  getNonFriends(username: string, search: string): Promise<UserEntity[]>;
}

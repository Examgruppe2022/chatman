import { CreateFriendRequestDto } from '../../friend-requests/dto/create-friend-requests.dto';
import { FriendRequestEntity } from '../entities/friend-request.entity';

export interface IFriendRequestService {
  SendRequest(request: CreateFriendRequestDto);

  getAllMyFriendRequests(username: string): Promise<FriendRequestEntity[]>;

  acceptFriendRequest(accept: CreateFriendRequestDto);
}

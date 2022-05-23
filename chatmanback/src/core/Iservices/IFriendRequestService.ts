import { CreateFriendRequestDto } from '../../friend-requests/dto/create-friend-requests.dto';

export interface IFriendRequestService {
  SendRequest(request: CreateFriendRequestDto);

  getAllMyFriendRequests(username: string);

  acceptFriendRequest(accept: CreateFriendRequestDto);
}

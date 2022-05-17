import { UpdateFriendRequestDto } from '../../friend-requests/dto/update-friend-requests.dto';
import { IFriendRequestRepository } from '../interfaces/friend-requestRepository.interface';
import { FriendRequest } from '../../core/entities/friend-request.entity';

export class FriendRequestsService {
  private friendRequestRepo: IFriendRequestRepository;

  constructor(friendRequestRepository: IFriendRequestRepository) {
    this.friendRequestRepo = friendRequestRepository;
  }

  create(
    sentUserUuid: string,
    sentUserName: string,
    receivedUserUuid: string,
    isAccepted: boolean,
  ): Promise<FriendRequest> {
    return this.friendRequestRepo.create(
      sentUserUuid,
      sentUserName,
      receivedUserUuid,
      isAccepted,
    );
  }

  findAll() {
    return `This action returns all friendRequests`;
  }

  getFriendRequests(receivedUserUuid: string): Promise<FriendRequest[]> {
    return this.friendRequestRepo.getFriendRequests(receivedUserUuid);
  }

  update(id: number, updateFriendRequestDto: UpdateFriendRequestDto) {
    return `This action updates a #${id} friendRequest`;
  }

  delete(uuid: string) {
    return this.friendRequestRepo.delete(uuid);
  }
}
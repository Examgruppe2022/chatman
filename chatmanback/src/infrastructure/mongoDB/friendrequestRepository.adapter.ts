import { IFriendRequestRepository } from '../../domain/interfaces/friend-requestRepository.interface';
import { Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'mongoose';
import { FriendRequestSchema} from "./friendrequestSchema";
import { FriendRequest } from '../../core/entities/friend-request.entity';

@Injectable()
export class FriendRequestRepositoryAdapter
  implements IFriendRequestRepository
{
  private readonly friendRequestRepo: Repository<FriendRequest>;

  constructor(private readonly em: EntityManager) {
    this.friendRequestRepo = em.getRepository(FriendRequestSchema);
  }

  create(
    sentUserUuid: string,
    sentUserName: string,
    receivedUserUuid: string,
    isAccepted: boolean,
  ): Promise<FriendRequest> {
    return this.friendRequestRepo.save({
      sentUserUuid: sentUserUuid,
      sentUserName: sentUserName,
      receivedUserUuid: receivedUserUuid,
      isAccepted: isAccepted,
    });
  }

  getFriendRequests(receivedUserUuid: string): Promise<FriendRequest[]> {
    return this.friendRequestRepo.find({
      where: { receivedUserUuid: receivedUserUuid },
    });
  }

  delete(uuid: string) {
    return this.friendRequestRepo.delete(uuid);
  }
}
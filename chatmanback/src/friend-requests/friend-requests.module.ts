import { Module } from '@nestjs/common';
import { FriendRequestsService } from '../domain/services/friend-requests.service';
import { FriendRequestsController } from './friend-requests.controller';
import { FriendRequestRepositoryAdapter } from '../infrastructure/mongoDB/friendrequestRepository.adapter';
import { IFriendRequestRepository } from '../domain/interfaces/friend-requestRepository.interface';
import { FriendRequestSchema} from "../infrastructure/mongoDB/friendrequestSchema";

@Module({
  //imports: [FriendRequestSchema],
  controllers: [FriendRequestsController],
  providers: [
    {
      provide: 'FriendRequestRepository',
      useClass: FriendRequestRepositoryAdapter,
    },
    {
      inject: ['FriendRequestRepository'],
      provide: 'FriendRequestsService',
      useFactory: (friendRequestRepository: IFriendRequestRepository) =>
        new FriendRequestsService(friendRequestRepository),
    },
  ],
})
export class FriendRequestsModule {}
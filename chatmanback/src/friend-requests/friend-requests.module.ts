import { Module } from '@nestjs/common';
import { MongoDbModule } from "../infrastructure/mongoDB/mongoDB.module";
import { userProvider } from "../infrastructure/mongoDB/userProvider";
import { friendrequestProvider } from "../infrastructure/mongoDB/friendrequestProvider";
import { FriendRequestsController } from "./friend-requests.controller";
import { FriendRequestsService } from "../domain/services/friend-requests.service";

@Module({
  imports: [MongoDbModule],
  controllers: [FriendRequestsController],
  providers: [FriendRequestsService, ...friendrequestProvider, ...userProvider],
})
export class FriendRequestsModule {}
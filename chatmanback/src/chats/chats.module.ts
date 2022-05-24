import { Module } from '@nestjs/common';
import { ChatsService } from '../domain/services/chats.service';
import { ChatsGateway } from './chats.gateway';
import { roomProvider } from '../infrastructure/mongoDB/roomProvider';
import { chatProvider } from '../infrastructure/mongoDB/chatProvider';
import { MongoDbModule } from '../infrastructure/mongoDB/mongoDB.module';
import { ChatsController } from "./chats.controller";

@Module({
  imports: [MongoDbModule],
  controllers: [ChatsController],
  providers: [
    {
      provide: 'IChatsService',
      useClass: ChatsService,
    },
    ChatsGateway,
    ChatsService,
    ...roomProvider,
    ...chatProvider,
  ],
})
export class ChatsModule {}

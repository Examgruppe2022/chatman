import { Module } from '@nestjs/common';
import { RoomsService } from '../domain/services/rooms.service';
import { RoomsController } from './rooms.controller';
import { roomProvider } from '../infrastructure/mongoDB/roomProvider';
import { userProvider } from '../infrastructure/mongoDB/userProvider';
import { MongoDbModule } from '../infrastructure/mongoDB/mongoDB.module';

@Module({
  imports: [MongoDbModule],
  controllers: [RoomsController],
  providers: [
    {
      provide: 'IRoomService',
      useClass: RoomsService,
    },
    RoomsService,
    ...roomProvider,
    ...userProvider,
  ],
})
export class RoomsModule {}

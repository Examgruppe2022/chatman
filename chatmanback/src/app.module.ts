import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './loginAndUser/login.module';
import { ChatsModule } from './chats/chats.module';
import { RoomsModule } from './rooms/rooms.module';
import { FriendRequestsModule } from "./friend-requests/friend-requests.module";

@Module({
  imports: [LoginModule, ChatsModule, RoomsModule, FriendRequestsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

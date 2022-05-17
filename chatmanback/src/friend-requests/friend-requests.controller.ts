import { Controller, Post, Body, Inject} from '@nestjs/common';
import { FriendRequestsService } from '../domain/services/friend-requests.service';
import { CreateFriendRequestDto} from "./dto/create-friend-requests.dto";


@Controller('friend-requests')
export class FriendRequestsController {
  constructor(
    private readonly friendRequestsService: FriendRequestsService,
  ) {}

  @Post()
  create(@Body() createFriendRequestDto: CreateFriendRequestDto) {
    return this.friendRequestsService.create(
      createFriendRequestDto
    );
  }
}
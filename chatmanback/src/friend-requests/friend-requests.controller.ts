import { Controller, Post, Body, Inject} from '@nestjs/common';
import { FriendRequestsService } from '../domain/services/friend-requests.service';
import { CreateFriendRequestDto} from "./dto/create-friend-requests.dto";
import { StringDto } from "../universalDtos/string.dto";


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
  @Post()
  getMyFriendRequests(@Body() username: StringDto){
    return this.friendRequestsService.getAllMyFriendRequests(
      username.text
    );
  }
}
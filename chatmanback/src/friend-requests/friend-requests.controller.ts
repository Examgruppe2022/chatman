import { Controller, Get, Post, Body, Patch, Param, Delete, Inject} from '@nestjs/common';
import { FriendRequestsService } from '../domain/services/friend-requests.service';
import { CreateFriendRequestDto} from "./dto/create-friend-requests.dto";
import { UpdateFriendRequestDto } from './dto/update-friend-requests.dto';
import { FriendRequest } from '../core/entities/friend-request.entity';

@Controller('friend-requests')
export class FriendRequestsController {
  constructor(
    @Inject('FriendRequestsService')
    private readonly friendRequestsService: FriendRequestsService,
  ) {}

  @Post()
  create(@Body() createFriendRequestDto: CreateFriendRequestDto) {
    return this.friendRequestsService.create(
      createFriendRequestDto.sentUserUuid,
      createFriendRequestDto.sentUserName,
      createFriendRequestDto.receivedUserUuid,
      createFriendRequestDto.isAccepted,
    );
  }

  @Get()
  findAll() {
    return this.friendRequestsService.findAll();
  }

  @Get(':receivedUserUuid')
  getFriendRequests(
    @Param('receivedUserUuid') receivedUserUuid: string,
  ): Promise<FriendRequest[]> {
    return this.friendRequestsService.getFriendRequests(receivedUserUuid);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFriendRequestDto: UpdateFriendRequestDto,
  ) {
    return this.friendRequestsService.update(+id, updateFriendRequestDto);
  }

  @Delete(':uuid')
  remove(@Param('uuid') uuid: string) {
    return this.friendRequestsService.delete(uuid);
  }
}
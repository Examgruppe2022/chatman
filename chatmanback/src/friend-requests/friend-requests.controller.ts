import { Controller, Post, Body, Inject, UseGuards } from '@nestjs/common';
import { FriendRequestsService } from '../domain/services/friend-requests.service';
import { CreateFriendRequestDto } from './dto/create-friend-requests.dto';
import { StringDto } from '../universalDtos/string.dto';
import { IFriendRequestService } from '../core/Iservices/IFriendRequestService';
import { JwtAuthGuard } from '../loginAndUser/Jwt-auth.Guard';

@Controller('friend-requests')
export class FriendRequestsController {
  constructor(
    @Inject('IFriendRequestService')
    private readonly friendRequestsService: IFriendRequestService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('/sendRequest')
  sendFriendRequest(@Body() createFriendRequestDto: CreateFriendRequestDto) {
    return this.friendRequestsService.SendRequest(createFriendRequestDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/getRequests')
  getMyFriendRequests(@Body() username: StringDto) {
    return this.friendRequestsService.getAllMyFriendRequests(username.text);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/acceptRequest')
  acceptFriendRequest(@Body() request: CreateFriendRequestDto) {
    return this.friendRequestsService.acceptFriendRequest(request);
  }
}

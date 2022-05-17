import { UpdateFriendRequestDto } from '../../friend-requests/dto/update-friend-requests.dto';
import { FriendRequest } from '../../core/entities/friend-request.entity';
import { Inject, Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { UserEntity } from "../../core/entities/User.Entity";
import { CreateFriendRequestDto } from "../../friend-requests/dto/create-friend-requests.dto";

@Injectable()
export class FriendRequestsService {
  constructor(
    @Inject('FRIENDREQUEST_MODEL') private readonly friendRequestModel: Model<FriendRequest>,
    @Inject('USER_MODEL') private readonly userModel: Model<UserEntity>,
  ) {}

  create(request: CreateFriendRequestDto){
    console.log(request);
    const newRequest = new this.friendRequestModel({
      senderUsername: request.senderUsername,
      receiverUsername: request.receiverUsername,
      isAccepted: false
    })
    return newRequest.save();
  }

  async getAllMyFriendRequests(username: String) {

  }

  findAll() {
    return `This action returns all friendRequests`;
  }
}
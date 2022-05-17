import { UpdateFriendRequestDto } from '../../friend-requests/dto/update-friend-requests.dto';
import { FriendRequestEntity } from '../../core/entities/friend-request.entity';
import { Inject, Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { UserEntity } from "../../core/entities/User.Entity";
import { CreateFriendRequestDto } from "../../friend-requests/dto/create-friend-requests.dto";

@Injectable()
export class FriendRequestsService {
  constructor(
    @Inject('FRIENDREQUEST_MODEL') private readonly friendRequestModel: Model<FriendRequestEntity>,
    @Inject('USER_MODEL') private readonly userModel: Model<UserEntity>,
  ) {}

  async create(request: CreateFriendRequestDto){
    const alreadySent = await this.friendRequestModel.findOne({
      senderUsername: request.senderUsername,
      receiverUsername: request.receiverUsername,
    });
    if (alreadySent) {
      throw new Error('You have already sent a request to this user')
    }
    else {
      const newRequest = new this.friendRequestModel({
        senderUsername: request.senderUsername,
        receiverUsername: request.receiverUsername,
        isAccepted: false
      })
      return newRequest.save();
    }
  }

  async getAllMyFriendRequests(username: String) {
    const friendRequests: FriendRequestEntity[] = [];
    const receivedFriendRequest = await this.friendRequestModel.find({
      receiverUsername: username, isAccepted: false
    })
    receivedFriendRequest.forEach(function(request) {
      friendRequests.push(
        new FriendRequestEntity({
          senderUsername: request.senderUsername,
          receiverUsername: request.receiverUsername,
          isAccepted: request.isAccepted
        })
      )
    })
    return friendRequests;
  }

  acceptFriendRequest(accept: CreateFriendRequestDto) {
    this.userModel.findOneAndUpdate(
      { username: accept.senderUsername },
      { $push: { friends: accept.receiverUsername } },
    );
    this.userModel.findOneAndUpdate(
      { username: accept.receiverUsername },
      { $push: { friends: accept.senderUsername } },
    );
    return this.friendRequestModel.findOneAndUpdate({
      senderUsername: accept.senderUsername,
      receiverUsername: accept.receiverUsername,
    },{
      isAccepted: true
    });
  }

  findAll() {
    return `This action returns all friendRequests`;
  }
}
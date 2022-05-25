import { FriendRequestEntity } from '../../core/entities/friend-request.entity';
import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { UserEntity } from '../../core/entities/User.Entity';
import { CreateFriendRequestDto } from '../../friend-requests/dto/create-friend-requests.dto';

@Injectable()
export class FriendRequestsService {
  constructor(
    @Inject('FRIENDREQUEST_MODEL')
    private readonly friendRequestModel: Model<FriendRequestEntity>,
    @Inject('USER_MODEL') private readonly userModel: Model<UserEntity>,
  ) {}

  async SendRequest(request: CreateFriendRequestDto) {
    console.log(request);
    const alreadySent = await this.friendRequestModel.findOne({
      senderUsername: request.senderUsername,
      receiverUsername: request.receiverUsername,
    });
    const alreadyRecived = await this.friendRequestModel.findOne({
      senderUsername: request.receiverUsername,
      receiverUsername: request.senderUsername,
    });
    if (alreadySent || alreadyRecived) {
      throw new Error(
        'You have already sent or recived a request from this user',
      );
    } else {
      const newRequest = new this.friendRequestModel({
        senderUsername: request.senderUsername,
        receiverUsername: request.receiverUsername,
        isAccepted: false,
      });
      console.log(newRequest);
      return newRequest.save();
    }
  }

  async getAllMyFriendRequests(
    username: string,
  ): Promise<FriendRequestEntity[]> {
    const friendRequests: FriendRequestEntity[] = [];
    const receivedFriendRequest = await this.friendRequestModel.find({
      receiverUsername: username,
      isAccepted: false,
    });
    receivedFriendRequest.forEach(function (request) {
      friendRequests.push(request);
    });
    return friendRequests;
  }

  async acceptFriendRequest(accept: CreateFriendRequestDto) {
    const sender = await this.userModel.findOne({
      username: accept.senderUsername,
    });
    sender.friends.push(accept.receiverUsername);
    await this.userModel.updateOne(
      { username: accept.senderUsername },
      { friends: sender.friends },
    );
    const receiver = await this.userModel.findOne({
      username: accept.receiverUsername,
    });
    receiver.friends.push(accept.senderUsername);
    await this.userModel.updateOne(
      { username: accept.receiverUsername },
      { friends: receiver.friends },
    );
    return this.friendRequestModel.findOneAndUpdate(
      {
        senderUsername: accept.senderUsername,
        receiverUsername: accept.receiverUsername,
      },
      {
        isAccepted: true,
      },
    );
  }

  //this method is used to clear the DB during testing, and should therefor not be added to the interface
  async debugDeleteFriendRequest(reciver: string) {
    console.log(
      await this.friendRequestModel.deleteOne({ receiverUsername: 'first' }),
    );
  }
}

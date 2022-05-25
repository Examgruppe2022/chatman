import { defineStore } from "pinia";
import { FriendRequestService } from "@/services/friendRequest.service";


const friendRequestService: FriendRequestService = new FriendRequestService();

export const friendRequestStore = defineStore({
  id:"friendRequestStore",
  state:() => ({
   myFriendRequest: [{sender: "refresh"}],

  }),

  actions: {

    getMyFriendRequest(receiver: string){
      friendRequestService
        .getMyFriendRequests(receiver)
        .then((fq) => (this.myFriendRequest = fq))
        .catch((err) => console.log(err))
    },

    acceptFriendRequest(receiver: string, sender: string){
      friendRequestService
        .acceptFriendRequest(receiver,sender);
      this.getMyFriendRequest(receiver);
    },

    sendFriendRequest(receiver: string, sender: string){
      friendRequestService
        .sendFriendRequest(receiver, sender);
    },
  },
});

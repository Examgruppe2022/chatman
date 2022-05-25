import http from "@/services/http.client";
import type { FriendRequest } from "@/models/FriendRequest";


export class FriendRequestService {

  async sendFriendRequest(
    receiver: string,
    sender: string,
  ): Promise<FriendRequest> {
    const res = await http.post<FriendRequest>("/sendRequests", {
      receiver: receiver,
      sender: sender,
    });
      return res.data;
    }

  async getMyFriendRequests(receiver: string): Promise<FriendRequest[]> {
    const res = await http.post<FriendRequest[]>("/friend-requests/getRequests",{
      text: receiver
    });
    return res.data;
  }

  async acceptFriendRequest(receiver: string, sender: string) {
   await http.post("/friend-requests/acceptRequest", {
      text: receiver, sender,
    });
  }
}

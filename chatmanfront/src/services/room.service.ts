import { UserStore } from "@/stores/userStore";
import { ChatStore } from "@/stores/chatStore";
import type { Room } from "@/models/Room";
import http from "./http.client";

export class RoomService {
  readonly userStore = UserStore();
  readonly chatStore = ChatStore();
  async createRoom(name: string): Promise<Room> {
    if (this.userStore.userName.length > 0) {
      const res = await http.post<Room>("/rooms", {
        name: name,
        username: this.userStore.userName,
      });
      if (res.data) {
        this.chatStore.setRoom(res.data.name);
      }
      return res.data;
    } else {
      throw new Error("");
    }
  }
}

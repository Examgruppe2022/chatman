import { UserStore } from "@/stores/userStore";
import { ChatStore } from "@/stores/chatStore";
import type { Room } from "@/Models/Room";
import http from "./http.client";

export class RoomService {

  async createRoom(name: string): Promise<Room> {
    const res = await http.post<Room>("/rooms", {
      name: name,
      username: "rasmus",
    });
    if (res.data) {
      return res.data;
    } else {
      throw new Error("");
    }
  }
}

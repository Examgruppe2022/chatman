import type { Room } from "@/models/Room";
import http from "./http.client";

export class RoomService {
  async createRoom(name: string): Promise<Room> {
    const res = await http.post<Room>("/rooms/createRoom", {
      roomName: name,
      roomCreator: "first",
    });
    if (res.data) {
      return res.data;
    } else {
      throw new Error("");
    }
  }

  async removeRoom(selectedRoomName: string) {
    await http.post("/rooms/delete",{
      roomName: selectedRoomName
    });
  }

   async findMyRooms(username: string): Promise<Room[]> {
    const res = await http.post<Room[]>("/rooms/ownRoom", {
      text: username,
    });
    return res.data;
  }

  async getAccessibleRoom(username: string) :Promise<Room[]> {
    const res = await http.post<Room[]>("/rooms/allAccessibleRooms",{
      text: username,
    });
    return res.data;

  }
}

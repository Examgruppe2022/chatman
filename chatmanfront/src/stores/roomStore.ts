import { defineStore } from "pinia";
import { RoomService } from "@/services/room.service";


const roomService = new RoomService();

export const RoomStore = defineStore({
  id: "RoomStore",
  state: () => ({
    myRooms:[{roomname: "please refresh"}],
    accessibleRooms:[{roomaname:"please"}],
  }),
  getters: {},

  actions: {
    createRoom(name: string){
      roomService.createRoom(name)
    }
  }
})



import { defineStore } from "pinia";
import { RoomService } from "@/services/room.service";


const roomService = new RoomService();

export const RoomStore = defineStore({
  id: "RoomStore",
  state: () => ({
    myRooms:[{roomName: "please refresh"}],
    accessibleRooms:[{roomName:"please"}],
  }),
  getters: {},

  actions: {

    findMyRooms(){
      roomService
        .findMyRooms("first")
        .then((rooms) => (this.myRooms = rooms))
        .catch((err) => console.log(err))
      console.log(this.myRooms)
    }

  }
})



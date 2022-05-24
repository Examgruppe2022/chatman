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
    createRoom (name: string){
      roomService.createRoom(name)
    },

    findMyRooms(){
      roomService
        .findMyRooms("first")
        .then((rooms) => (this.myRooms = rooms))
        .catch((err) => console.log(err))
      console.log(this.myRooms)
    },

    getAccessibleRoom(){
      roomService
        .getAccessibleRoom("first")
        .then((rooms) => (this.accessibleRooms=rooms))
        .catch((err) => console.log(err))
      console.log(this.accessibleRooms)
    },
  }
})



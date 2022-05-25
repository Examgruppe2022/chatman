import { defineStore } from "pinia";
import { RoomService } from "@/services/room.service";

const roomService = new RoomService();

export const RoomStore = defineStore({
  id: "RoomStore",
  state: () => ({
    myRooms: [{ roomName: "please refresh" }],
    accessibleRooms: [{ roomName: "please" }],
  }),

  actions: {
    createRoom(name: string, username: string) {
      roomService.createRoom(name, username).then(() => {
        this.findMyRooms(name);
      });
    },

    findMyRooms(username: string) {
      roomService
        .findMyRooms(username)
        .then((rooms) => (this.myRooms = rooms))
        .catch((err) => console.log(err));
      console.log(this.myRooms);
    },

    getAccessibleRoom(username: string) {
      roomService
        .getAccessibleRoom(username)
        .then((rooms) => (this.accessibleRooms = rooms))
        .catch((err) => console.log(err));
      console.log(this.accessibleRooms);
    },
  },
});

import { defineStore } from "pinia";
import { ChatService } from "@/services/chat.service";
import type { Chat } from "@/models/Chat";

const chatService = new ChatService();

export const ChatStore = defineStore({
  id: "ChatStore",
  state: () => ({
    chats: [
      { text: "USERNAME", sender: "MESSAGE" },
      { text: "second", sender: "tester 2" },
    ],
    room: "",
  }),
  getters: {
    roomName: (state) => {
      if (state.room != undefined) return state.room;
      else return "No Room";
    },
  },
  actions: {
    createChat(chat: Chat){
      chatService.createChat(chat);
      this.chats.push(chat);
    },

    setRoom(room: string){
      if (this.room) chatService.disconnectFromRoom(this.room);
      this.room = room;
      this.chats = [];
      chatService.listenToRoom(room,(chat) => {
        this.chats.push(chat);
      });
    },
  },
});



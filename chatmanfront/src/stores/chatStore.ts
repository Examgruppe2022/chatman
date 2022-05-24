import { defineStore } from "pinia";
import { ChatService } from "@/services/chat.service";
import type { Chat } from "@/models/Chat";

const chatService = new ChatService();

export const ChatStore = defineStore({
  id: "ChatStore",
  state: () => ({
    chatRooms:[{ username:" Please Refresh"}],
    yourChatRooms:[{ username:" Please Refresh"}],
    chats: [
      { text: "USERNAME", sender: "MESSAGE", timeStamp: new Date() },
      { text: "second", sender: "tester 2", timeStamp: new Date() },
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
      chat.timeStamp = new Date();
      chatService.createChat(chat);
      this.chats.push(chat);
    },

    setRoom(room: string){
      if (this.room) chatService.disconnectFromRoom(this.room);
      this.room = room;
      this.chats = [];
      chatService.getOldMessage(room)
        .then((oldChat) => {
          this.chats = oldChat;
        }).catch((err) => console.log(err))
      chatService.listenToRoom(room,(chat) => {
        this.chats.push(chat);
      });
    },

  },
});



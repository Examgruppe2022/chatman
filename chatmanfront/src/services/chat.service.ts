import { io } from "socket.io-client";
import type { Chat } from "@/models/Chat";
import http from "./http.client";

export class ChatService {
  socket = io("http://185.51.76.42:8091/");

  constructor() {
    this.socket.on("connect", () => {
      console.log(this.socket.id);
    });
  }

  createChat(chat: Chat) {
    this.socket.emit("createChat", chat);
  }

  listenToRoom(room: string, chatListener: (chat: Chat) => void) {
    this.socket.on(room, (chat: Chat) => {
      chatListener(chat);
    });
  }

  disconnectFromRoom(room: string) {
    this.socket.off(room);
  }

  async getOldMessage(room: string): Promise<Chat[]> {
    console.log(room);
    const res = await http.post<Chat[]>("/chat/chatFromRoom", {
      text: room,
    });
    return res.data;
  }
}

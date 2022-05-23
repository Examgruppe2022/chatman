import { createRouter, createWebHistory } from "vue-router";
import StartView from "../views/StartView.vue";
import ProfileView from "../views/ProfileView.vue";
import ChatView from "../views/ChatView.vue";
import FriendView from "../views/FriendView.vue";
import CreateUserView from "../views/CreateUserView.vue";
import ConnectChatView from "../views/ConnectChatView.vue";
import CreateChatView from "../views/CreateChatView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "start",
      component: StartView,
    },
    {
      path: "/profile",
      name: "profile",
      component: ProfileView,
    },
    {
      path: "/chat",
      name: "chat",
      component: ChatView,
    },
    {
      path: "/friend",
      name: "friend",
      component: FriendView,
    },
    {
      path: "/createuser",
      name: "createuser",
      component: CreateUserView,
    },
    {
      path: "/chatroom",
      name: "chatroom",
      component: ConnectChatView,
    },
    {
      path: "/createchat",
      name: "createchat",
      component: CreateChatView,
    }
  ],
});

export default router;

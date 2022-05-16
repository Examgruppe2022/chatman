<template>

  <div class="left-man">
    <div class="top-man">
  <br />
  <h3>Send a Message</h3>
  <InputText v-model="txtChatInput" placeholder="Enter message" />
      <br/>
  <Button class="p-button-rounded p-button-secondary " @click="sendChat">Send</Button>
    <br />
  <br />
  </div>
    </div>
  <ul>
    <li v-for="(chat, index) in chatStore.chats" v-bind:key="index">
      {{ chat.sender }} : {{ chat.text }}
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ChatStore } from "@/stores/chatStore";
import { UserStore } from "@/stores/userStore";
import { ref } from "vue";

const chatStore = ChatStore();
const userStore = UserStore();
const txtChatInput = ref("");
const roomChatInput = ref("");
const roomListener = ref("");
const loggedInUserName = userStore.userName;

function ListenToRoom() {
  chatStore.setRoom(roomListener.value);
}

function sendChat() {
  chatStore.createChat( {
    text: txtChatInput.value,
    room: roomChatInput.value,
    sender: loggedInUserName
  });
}

</script>

<style>
.top-man {
  height: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.left-man{
  height: 20%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: left;
}
.center_man {
  height: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
